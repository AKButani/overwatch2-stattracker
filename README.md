# Stat-Watch

[[_TOC_]]

## Team Members
1. Arjun Butani
2. Elia Hämmerli
3. Alexander Roth

## Project Description 
 Overwatch 2, a popular team-based multiplayer game, lacks an official centralized web-platform for players to efficiently access detailed statistics about their performance and that of others. Players currently face the challenge of scattered information across multiple platforms, making it difficult to assess their strengths, weaknesses, and overall progress. This project addresses the need for a comprehensive stat tracker website tailored to Overwatch 2 players.

### Project goals
The goal is to create a user-friendly website that aggregates and presents detailed player statistics from Overwatch matches. This includes individual performance metrics, hero-specific data and win/loss ratios. The API exposes several types of data, which allows for a variety of data visualizations.

### Data Sources
We will leverage the [Overfast API](https://overfast-api.tekrop.fr/) to gather player data efficiently. Our team has already conducted preliminary research and explored the API's capabilities. 

### Tasks
Define all the tasks you want your app to solve.


## Requirements
Write here all intructions to build the environment and run your code.\
**NOTE:** If we cannot run your code following these requirements we will not be able to evaluate it.

## How to Run
Write here **DETAILED** intructions on how to run your code.\
**NOTE:** If we cannot run your code following these instructions we will not be able to evaluate it.

As an example here are the instructions to run the Dummy Project:
To run the Dummy project you have to:
- clone the repository;
- open a terminal instance and using the command ```cd``` move to the folder where the project has been downloaded;
- then run:


### Local Development

Only change files inside the `src` directory.

**Client side**

All client side files are located in the `src/client` directory.

**Server side**

All server side files are located in the `src/server` directory.

### Local Testing

**run container for local testing**

```bash
docker build -t my-webapp .

docker run -it --rm -p 5173:5173 my-webapp
```
Open a browser and connect to http://localhost:5173

**run bash in interactive container**
```bash
docker build -t my-webapp src/.

docker run -it --rm -p 5173:5173 my-webapp bash
```


## Milestones
Document here the major milestones of your code and future planned steps.\
- [X] Milestone 1: Basic Functionality [Link to Merge](course-fwe2023/students/project/express/abutani_project_express!3)
  - [x] Allow User Input
  - [x] Fetch the Data from the API
  - [x] Display the Data in a simple form

- [ ] Milestone 2
  - [ ] Sub-task: Add bookmarks
  - [ ] Sub-task: ...

Create a list subtask.\
Open an issue for each subtask. Once you create a subtask, link the corresponding issue.\
Create a merge request (with corresponding branch) from each issue.\
Finally accept the merge request once issue is resolved. Once you complete a task, link the corresponding merge commit.\
Take a look at [Issues and Branches](https://www.youtube.com/watch?v=DSuSBuVYpys) for more details. 

This will help you have a clearer overview of what you are currently doing, track your progress and organise your work among yourselves. Moreover it gives us more insights on your progress.  

## Weekly Summary 
Write here a short summary with weekly progress, including challanges and open questions.\
We will use this to understand what your struggles and where did the weekly effort go to.

## Versioning
Create stable versions of your code each week by using gitlab tags.\
Take a look at [Gitlab Tags](https://docs.gitlab.com/ee/topics/git/tags.html) for more details. 

Then list here the weekly tags. \
We will evaluate your code every week, based on the corresponding version.

Tags:
- Milestone 1: ...
- Milestone 2: ...
- Milestone 3: ...
- ...



