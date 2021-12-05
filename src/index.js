import axios from "axios";
//this is sample uri
const PUT_URL =
  "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json";

class RequestsPooler {
  // queue to  stores all requests to be processed
  requestsQueue;
  // consuimg variable is a bool type variable which states if the Pooler Engine is consuming the reuquests or not
  isConsuming;

  //this is callback functions to be called when every requests has been processed successfully
  resolver;
  //this is callback functions to be called when there is some error while processing any requests
  rejecter;

  constructor(r) {
    this.requestsQueue = [];
    this.isConsuming = false;
    this.resolver = null;
    this.rejecter = null;
  }

  // add an request to the queue
  produce(value) {
    // add a new request to the end of the queue

    this.requestsQueue.unshift(value);

    //check if system is already consuming , if not then restart the consumer to consume the request as
    // new request has come
    if (this.isConsuming == false) this._consume();

    let tmp = this;
    // follwoing is the promise that will resolved when finally every requests in queue has been resolved

    let _promise = new Promise((resolve, reject) => {
      tmp.resolver = resolve;
      tmp.rejector = reject;
    });

    return _promise;
  }

  _consume() {
    let tmp = this;

    tmp.isConsuming = true;

    //base case when every requests has been processed
    if (this.requestsQueue.length == 0) {
      this.isConsuming = false;
      tmp.resolver();

      return;
    }
    let value = this.requestsQueue.pop();

    let p = axios.put(PUT_URL, { Divyanshu_Raj: value });

    p.then(() => {
      //recursively, call for next request
      tmp._consume();
    }).catch(() => {
      //recursively move on , for next  request
      tmp.consume();
      tmp.rejector();
    });
  }
}

export default RequestsPooler;
