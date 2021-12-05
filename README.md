# Requests_Pooler

### About :
```
consider the case where you need to make more than 30 network calls in a matter of seconds due to some user behavior os business logic,one such example is a counter application, where user can click to increase or decrease the counter and it is required that, every step should be synced to the database i.e you have to update the value of counter to the databse everytime user makes any changes.

In those cases it becomes complex and difficult to manage the requests , this project aims to solve that problem, it stores every requests in a queue and process it one by one, sequentially ( not vaguely), and returns a promise that will be resolve when every requests has been processed.


see one live usecase of this project [here](https://github.com/endurance21/quick_sell_assignment) .

```

### HOW TO USE
```
 Directly copy the code from src/index.js,make an instance of the class defined.
 
 Use following method  :
 
 1. poducer 
    - add an request to be processed 
    
 2. _consume
    - dont use it directly, it is a private member function and to be used interannly by other member functions.

```
### CAUTION :
```
The current implementation does not follow singleton design pattern , so use  only one instance across the app.
```
### TODO
```
 Make the RequestsPooler Class Singleton.
```
