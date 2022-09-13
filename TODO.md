<!-- Project journey:

This project is changing from news aggregating to a job search aggregator.

The goal is to get jobs from various website, where users can type in the job type, then result will be returned.
I am targeting users in Hong Kong, LinkedIn or Indeed will be not included.

How to do it?
I need to find the job titles, the links to the job details, but jobs changes daily there a database is not needed.
Client able to search and trigger the scraping function, and return all jobs sites in a reactive manner.

Constant:
class of the divs and a tags from different websites

Variables:
Job title search by clients.

e.g: jobsearch.com/job?=software+engineer
the query will trigger scrape function and return data in json
once all data return, sections of jobs based on the job site will be created. -->

[]- Scrape target links with followings:
    []- media: Image
    []- links
    []- source
    []- form data in the following format

```ts
        export interface NewscatcherInterface {
    status: string
    articles: NewscatcherArticleInterface[]
}

export interface NewscatcherArticleInterface {
    summary: string
    country: string
    author: string
    link: string
    language: string
    media: string
    title: string
    media_content: string[]
    clean_url: string
    rights: string
    rank: string
    topic: string
    published_date: Date
    _id: string
}

```
