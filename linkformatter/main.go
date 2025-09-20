package main

import (
	"bufio"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strings"
	"sync"
	"time"

	"golang.org/x/net/html"
)

type LinkInfo struct {
	OriginalURL string
	Domain      string
	Title       string
}

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run main.go input.md output.md")
		return
	}

	inputFile := os.Args[1]
	outputFile := os.Args[2]

	file, err := os.Open(inputFile)
	if err != nil {
		fmt.Printf("Error opening input file: %v\n", err)
		return
	}
	defer file.Close()

	var urls []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line != "" {
			urls = append(urls, line)
		}
	}
	if err := scanner.Err(); err != nil {
		fmt.Printf("Error reading input file: %v\n", err)
		return
	}

	// Fetch titles concurrently
	results := make([]LinkInfo, len(urls))
	var wg sync.WaitGroup
	for i, link := range urls {
		wg.Add(1)
		go func(i int, link string) {
			defer wg.Done()
			info := LinkInfo{OriginalURL: link}
			u, err := url.Parse(link)
			if err == nil {
				info.Domain = baseDomain(u.Hostname())
			}

			info.Title = fetchTitle(link)
			if info.Title == "" {
				info.Title = link // fallback
			}
			results[i] = info
		}(i, link)
	}
	wg.Wait()

	// Write output
	out, err := os.Create(outputFile)
	if err != nil {
		fmt.Printf("Error creating output file: %v\n", err)
		return
	}
	defer out.Close()

	writer := bufio.NewWriter(out)
	for _, r := range results {
		line := fmt.Sprintf(
			"- ![Favicon](https://www.google.com/s2/favicons?domain=%s&sz=16) [%s](%s)\n",
			r.Domain, r.Title, r.OriginalURL,
		)
		writer.WriteString(line)
	}
	writer.Flush()
}

// Extract the base domain (drop subdomains)
func baseDomain(host string) string {
	parts := strings.Split(host, ".")
	if len(parts) <= 2 {
		return host
	}
	// Handle common 2-part TLDs (co.uk, com.au, etc.)
	tld2 := []string{"co.uk", "com.au", "co.jp", "co.in", "amazon.com"}
	lastTwo := strings.Join(parts[len(parts)-2:], ".")
	lastThree := strings.Join(parts[len(parts)-3:], ".")
	for _, t := range tld2 {
		if strings.HasSuffix(lastThree, t) {
			return lastThree
		}
	}
	return lastTwo
}

func fetchTitle(link string) string {
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(link)
	if err != nil {
		return ""
	}
	defer resp.Body.Close()

	z := html.NewTokenizer(resp.Body)
	titleRegex := regexp.MustCompile(`\s+`)

	for {
		tt := z.Next()
		switch tt {
		case html.ErrorToken:
			return ""
		case html.StartTagToken, html.SelfClosingTagToken:
			t := z.Token()
			if t.Data == "title" {
				if z.Next() == html.TextToken {
					rawTitle := z.Token().Data
					return strings.TrimSpace(titleRegex.ReplaceAllString(rawTitle, " "))
				}
			}
		}
	}
}
