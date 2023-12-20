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
With our web-app we want to give the users the ability to get a good overview of their, or their friend's, Overwatch 2 account. 

With different visualisations, the user should be able to quickly understand how much and how well they play certain heroes. 


## Requirements
1) Install Node.js and make sure it is running.

## How to Run
To run the project you have to:
1) clone the repository
2) open a terminal instance and using the command ```cd``` move to the folder where the project has been downloaded
3) then execute the command ```npm run dev```


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
  - [x] Display the Data with Hero Cards

- [x] Milestone 2: Visualisations
  - [x] Sub-task: Add Sankey Diagram
  - [x] Sub-task: [Add Circular Packing Diagram](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/5)

- [x] Milestone 3: Different Filtering options
  - [x] Sub-task: [Competitive / Quickplay Selector](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/6)
  - [x] Sub-task: [PC / Console Selector](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/8)
  - [x] Sub-task: [Auto-Switch Tabs](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/11)

- [x] Milestone 4: [Bookmarks](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/10)
  - [x] Sub-task: [Make state change update bookmarks instantly](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/13)

- [x] Milestone 5: Overall Layout
  - [x] Sub-task: [Fonts](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/merge_requests/14)



Create a list subtask.\
Open an issue for each subtask. Once you create a subtask, link the corresponding issue.\
Create a merge request (with corresponding branch) from each issue.\
Finally accept the merge request once issue is resolved. Once you complete a task, link the corresponding merge commit.\
Take a look at [Issues and Branches](https://www.youtube.com/watch?v=DSuSBuVYpys) for more details. 

This will help you have a clearer overview of what you are currently doing, track your progress and organise your work among yourselves. Moreover it gives us more insights on your progress.  

## Weekly Summary 
Write here a short summary with weekly progress, including challanges and open questions.\
We will use this to understand what your struggles and where did the weekly effort go to.

20.11.23 - 26.11.23
  - Decided to use Express for the backend and React for the frontend, due to the experience we gathered from the exercises during the semester.

  - The main challenge we dealt with was making sure the API works as intended, and we created a rough layout of how we want our webpage to look like.

  - We created a simple searchbar which allowed us to test the API and make sure that we recieved the player data. 

27.11.23 - 3.12.23
  - Started different kinds of visualisations, e.g. Sankey Diagram.

  - Added Herocards which allow the user, to get some stats for every specific hero. 


4.12.23 - 10.12.23

  - Added another visualisation: CircularDiagram

  - Improved visualisations of the Searchbar as well as the hero cards.

  - Added Player Overview, including their name, title, rank, etc.

11.12.23 - 17.12.23

  - Added bookmarks

  - Added Quickplay / Competitive Selector

  - Added PC / Console Selector

  - Fixed bugs with the bookmarks

18.12.23 - 21.12.23

  - Improve Layout 

  - Bug fixes

  - Added fonts

## Versioning
Create stable versions of your code each week by using gitlab tags.\
Take a look at [Gitlab Tags](https://docs.gitlab.com/ee/topics/git/tags.html) for more details. 

Then list here the weekly tags. \
We will evaluate your code every week, based on the corresponding version.

Tags:
- Week 1: [Week1](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/tags/Week1)
- Week 2: [Week2](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/tags/Week2)
- Week 3: [Week3](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/tags/week3)
- Week 4: [Week4](https://gitlab.inf.ethz.ch/course-fwe2023/students/project/express/abutani_project_express/-/tags/week4)
- Final Version:
- Milestone 1: ...
- Milestone 2: ...
- Milestone 3: ...
- ...



