# Tasks and Reminders Application #

Application which help the user to manage tasks and reminders

## Concept ##
- Categorize tasks and reminders 
- Add a new Task / Reminder
- Update status (finished / ongoing)
- Delete permanently a task / reminder

## Redux Store ##

### Responsibilities ###

1. UI State Management
    - Tracks which task is selected (selectedTaskId)
    - Manages the current view mode (viewMode, e.g., 'list' or 'grid')

2. Settings State
    - Stores user/application settings (via the settings slice)
    - Manages language, theme, and other user preferences

3. Health Metrics and Menu State
    - Stores health check metrics for the app (via the healthMetrics slice)
    - Manages menu state (via the menu slice)

4. Selectors for UI State
    - Provides selectors to access UI state (e.g., selectViewMode, selectSelectedTaskId)

5. Redux DevTools and Middleware
    - Enables Redux DevTools for debugging (in non-production)
    - Uses middleware like redux-logger in development for action/state logging

### What the Redux Store Does NOT Do ###
1. Does NOT manage task data, mutations, or server state (handled by React Query and custom hooks)
2. Does NOT handle optimistic updates, caching, or pagination for tasks
3. Does NOT coordinate business logic or side effects for tasks

### **Summary Table**

| State Type         | Managed by Redux? | Example Slice/Selector      |
|--------------------|:----------------:|-----------------------------|
| UI State           |        ✅         | `taskUI`, `selectViewMode`  |
| User Settings      |        ✅         | `settings`                  |
| Health Metrics     |        ✅         | `healthMetrics`             |
| Menu State         |        ✅         | `menu`                      |
| Task Data          |        ❌         | (Handled by React Query)    |
| Task Mutations     |        ❌         | (Handled by React Query)    |
| Pagination         |        ❌         | (Handled by hooks/React Q.) |
| Optimistic Updates |        ❌         | (Handled by React Query)    |



## Releases ##

### 0.1.1 ###

* [Third party API for UI testing](https://dummyjson.com/)

### Technical Stack ###
* Data storage: Firebase 9 
* FrontEnd: React JS, Tailwind 
* BackEnd: Serverless
* Built using: Vite
* Architecture: To be defined 

### Available Functions ###
* Add a new task
* Display tasks
* Update status
* Delete a Task


## Branches ##
* OldStable : deprecated versions of the project
* Stable: current or latest official version
* Unstable: sourcecode that is in progress of testing
* Experimental: sourcecode in progress

## Snapshots ##
![localhost](./snapshots/view.png)

## Proof of Concept ##
[Todo]


## Bugs ##
Please refer to the Issues section in this repository

## References ###
[Original tutorial](https://youtu.be/drF8HbnW87w?si=MD15WKGIJXGMdCEq)
