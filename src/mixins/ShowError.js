import {Notify} from "quasar";

export default {
  methods: {
    showError(error) {
      if (error.response) {
        for (let key in error.response.data){
          for (let err in error.response.data[key]){
            Notify.create(
              {
                type: 'negative',
                message: error.response.data[key][err]
              })
          }

        }
      } else if (error.request) {
        Notify.create(
          {
            type: 'negative',
            message: 'Ошибка связи с сервером'
          })
      }
      else{
        Notify.create(
          {
            type: 'negative',
            message: 'Непредвиденная ошибка'
          })
      }
    }
  }
}
