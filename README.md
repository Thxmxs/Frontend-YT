---

## Desarrollo desafio Frontend YoutubeAPI




__Tecnologias__

1. Vue 3 composition API
2. Node JS + express
3. Mongo DB

__Despliegues__
1. BackEnd: AWS EC2
2. FrontEnd: S3 bucket
3. DB: Mongo Atlas

__Demo__

http://frontendyt.s3-website.us-east-2.amazonaws.com/

Endpoints:

``` js
Get Videos (get)
http://ec2-18-217-45-176.us-east-2.compute.amazonaws.com:3000/api/videos

Delete Videos (delete)
http://ec2-18-217-45-176.us-east-2.compute.amazonaws.com:3000/api/videos:id

Create Video (post)
http://ec2-18-217-45-176.us-east-2.compute.amazonaws.com:3000/api/videos

body:
 videoId:{
        type:String,
        required:[true,'El videoId del video es obligatorio'],
        unique:true
    },
    title:{
        type:String,
        required:[true,'el titulo es obligatorio'],
        unique:false
    },
    description:{
        type:String,
        required:false
    },
    image:{
        type:String,
        required:[true,'la url de la imagen es obligatoria']
    },
    duration:{
        type:String,
        required:[true,'la duracion es obligatoria']
    }

```

__Main__

![image](https://github.com/Thxmxs/Frontend-YT/assets/69379135/09adc95f-314c-440d-9e68-57f339f503d6)


__Detail Modal__

![image](https://github.com/Thxmxs/Frontend-YT/assets/69379135/0de962ee-d629-4142-9de8-515e74f46bbe)

__Delete Modal__

![image](https://github.com/Thxmxs/Frontend-YT/assets/69379135/8b012ff1-6f68-4ef7-89cc-5136b3f95d5a)
