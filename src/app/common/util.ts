import {Observable} from "rxjs";

export function createHttpObservable(url:string){
  return  Observable.create(observer => {

    const controller = new AbortController()
    const signal = controller.signal

    fetch(url,{signal})
      .then(res => {
        if (res.ok){
          return res.json()
        }else {
          observer.error("Request faild with status code" + res.status)
        }
      })
      .then(body => {
        observer.next(body)

        observer.complete()

      })
      .catch(err => {
        observer.error(err)
      })
    return () => controller.abort()
  })
}

