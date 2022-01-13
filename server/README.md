# Carbon Offset Lab

## Table of contents

- [Description](#description)
- [Technologies used](#technologiesused)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the app](#runningtheapp)

## Description

This is the backend app for the Carbon Offset Lab project

## Technologies used

- Nest.js
- TypeScript
- TypeORM
- PostgreSQL
- JWT

## Prerequisites

You need to have a PostgreSQL table called "carbonoffsetlab". The name can be changed in the <code>.env</code> file.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# build
$ npm run build

# run migrations
$ npm run migration:run:development

# run the app in watch mode
$ npm run start:dev
```
