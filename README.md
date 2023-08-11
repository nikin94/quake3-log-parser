# Quake Stats

Quake 3 logs parsing project

This web application uses [chart.js](https://www.chartjs.org/) library to visualise some of the given log data.

Allows to upload log directly or use default one.

The uploaded log can be exported as a JSON file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Or you can try it online: [https://quake3-log-parser.vercel.app/](https://quake3-log-parser.vercel.app/)

### Usage

To upload use "Upload log" button. It takes only \*.log files.

Dropdown selector allows you to choose between games parsed from the log file.

Interactive JSON-tree might be used to inspect data immediately.
