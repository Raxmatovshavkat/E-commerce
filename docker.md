# Docker Buyruqlari Ma'lumotnomasi


# Docker Commands Reference

## Table of Contents
- [1. Docker Installation](#1-docker-installation)
- [2. Docker Images](#2-docker-images)
  - [2.1 List Images](#21-list-images)
  - [2.2 Pull an Image](#22-pull-an-image)
  - [2.3 Remove an Image](#23-remove-an-image)
- [3. Docker Containers](#3-docker-containers)
  - [3.1 List Containers](#31-list-containers)
  - [3.2 Run a Container](#32-run-a-container)
  - [3.3 Stop a Container](#33-stop-a-container)
  - [3.4 Remove a Container](#34-remove-a-container)
- [4. Docker Networking](#4-docker-networking)
  - [4.1 List Networks](#41-list-networks)
  - [4.2 Create a Network](#42-create-a-network)
  - [4.3 Remove a Network](#43-remove-a-network)
- [5. Docker Volumes](#5-docker-volumes)
  - [5.1 List Volumes](#51-list-volumes)
  - [5.2 Create a Volume](#52-create-a-volume)
  - [5.3 Remove a Volume](#53-remove-a-volume)

## 1. Docker Installation
Follow the official documentation to install Docker on your platform: [Install Docker](https://docs.docker.com/get-docker/)

## 2. Docker Images

### 2.1 List Images



## 1. Docker O'rnatilishi
Docker ni o'rnatish uchun rasmiy hujjatlarni ko'ring: [Docker ni o'rnatish](https://docs.docker.com/get-docker/)

## 2. Docker Tasvirlari

### 2.1 Tasvirlarni Ro'yxatga Olish
docker images
- Mahalliy mashinada mavjud Docker tasvirlarini ro'yxatga oladi.

### 2.2 Tasvirni Yuklash
docker pull <tasvir_nomi>:<tag>
- Misol: 
  - docker pull ubuntu:latest
- Berilgan tasvirni Docker Hub dan yuklaydi.

### 2.3 Tasvirni O'chirish
docker rmi <tasvir_nomi>:<tag>
- Misol: 
  - docker rmi ubuntu:latest
- Berilgan tasvirni mahalliy mashinadan o'chiradi.

## 3. Docker Konteynerlari

### 3.1 Konteynerlarni Ro'yxatga Olish
docker ps
- Ishlayotgan konteynerlarni ro'yxatga oladi. Hammasini (to'xtatilganlar bilan) ko'rish uchun:
  - docker ps -a

### 3.2 Konteynerni Ishga Tushirish
docker run --name <konteyner_nomi> <tasvir_nomi>:<tag>
- Misol: 
  - docker run --name my-ubuntu ubuntu:latest
- Berilgan tasvirdan yangi konteynerni ishga tushiradi.

### 3.3 Konteynerni To'xtatish
docker stop <konteyner_nomi>
- Misol: 
  - docker stop my-ubuntu
- Ishlayotgan konteynerni to'xtatadi.

### 3.4 Konteynerni O'chirish
docker rm <konteyner_nomi>
- Misol: 
  - docker rm my-ubuntu
- To'xtatilgan konteynerni o'chiradi.

## 4. Docker Tarmog'i

### 4.1 Tarmoqlarni Ro'yxatga Olish
docker network ls
- Barcha Docker tarmoqlarini ro'yxatga oladi.

### 4.2 Tarmoqni Yaratish
docker network create <tarmoq_nomi>
- Misol: 
  - docker network create my-network
- Yangi Docker tarmog'ini yaratadi.

### 4.3 Tarmoqni O'chirish
docker network rm <tarmoq_nomi>
- Misol: 
  - docker network rm my-network
- Berilgan Docker tarmog'ini o'chiradi.

## 5. Docker Hajmlari

### 5.1 Hajmlarni Ro'yxatga Olish
docker volume ls
- Barcha Docker hajmlarini ro'yxatga oladi.

### 5.2 Hajmni Yaratish
docker volume create <hajm_nomi>
- Misol: 
  - docker volume create my-volume
- Yangi Docker hajmini yaratadi.

### 5.3 Hajmni O'chirish
docker volume rm <hajm_nomi>
- Misol: 
  - docker volume rm my-volume
- Berilgan Docker hajmini o'chiradi.


# Docker Buyruqlari Ma'lumotnomasi

## 1. Docker O'rnatilishi
Docker ni o'rnatish uchun rasmiy hujjatlarni ko'ring: [Docker ni o'rnatish](https://docs.docker.com/get-docker/)

## 2. Docker Tasvirlari

### 2.1 Tasvirlarni Ro'yxatga Olish
docker images
- Mahalliy mashinada mavjud Docker tasvirlarini ro'yxatga oladi.

### 2.2 Tasvirni Yuklash
docker pull <tasvir_nomi>:<tag>
- Misol: 
  - docker pull ubuntu:latest
- Berilgan tasvirni Docker Hub dan yuklaydi.

### 2.3 Tasvirni O'chirish
docker rmi <tasvir_nomi>:<tag>
- Misol: 
  - docker rmi ubuntu:latest
- Berilgan tasvirni mahalliy mashinadan o'chiradi.

### 2.4 Tasvirni Yangilash
docker pull <tasvir_nomi>
- Misol:
  - docker pull ubuntu
- Berilgan tasvirning oxirgi versiyasini yuklaydi.

### 2.5 Tasvirni Qayta Yuklash
docker build -t <tasvir_nomi>:<tag> <directory>
- Misol:
  - docker build -t my-app:1.0 .
- Berilgan joylashuvdagi Dockerfile dan yangi tasvir yaratadi.

## 3. Docker Konteynerlari

### 3.1 Konteynerlarni Ro'yxatga Olish
docker ps
- Ishlayotgan konteynerlarni ro'yxatga oladi.
- Qo'shimcha: To'xtatilgan konteynerlarni ko'rish uchun:
  - docker ps -a

### 3.2 Konteynerni Ishga Tushirish
docker run --name <konteyner_nomi> <tasvir_nomi>:<tag>
- Misol: 
  - docker run --name my-ubuntu ubuntu:latest
- Berilgan tasvirdan yangi konteynerni ishga tushiradi.

### 3.3 Konteynerni To'xtatish
docker stop <konteyner_nomi>
- Misol: 
  - docker stop my-ubuntu
- Ishlayotgan konteynerni to'xtatadi.

### 3.4 Konteynerni O'chirish
docker rm <konteyner_nomi>
- Misol: 
  - docker rm my-ubuntu
- To'xtatilgan konteynerni o'chiradi.

### 3.5 Konteynerni Yana Ishga Tushirish
docker start <konteyner_nomi>
- Misol:
  - docker start my-ubuntu
- To'xtatilgan konteynerni qayta ishga tushiradi.

### 3.6 Konteynerni O'ng Qo'shish
docker exec -it <konteyner_nomi> <buyruq>
- Misol:
  - docker exec -it my-ubuntu bash
- Berilgan konteynerda yangi buyruqni bajaradi.

## 4. Docker Tarmog'i

### 4.1 Tarmoqlarni Ro'yxatga Olish
docker network ls
- Barcha Docker tarmoqlarini ro'yxatga oladi.

### 4.2 Tarmoqni Yaratish
docker network create <tarmoq_nomi>
- Misol:
  - docker network create my-network
- Yangi Docker tarmog'ini yaratadi.

### 4.3 Tarmoqni O'chirish
docker network rm <tarmoq_nomi>
- Misol:
  - docker network rm my-network
- Berilgan Docker tarmog'ini o'chiradi.

### 4.4 Tarmoqni O'zgartirish
docker network connect <tarmoq_nomi> <konteyner_nomi>
- Misol:
  - docker network connect my-network my-ubuntu
- Berilgan konteynerni berilgan tarmoqka ulaydi.

### 4.5 Tarmoqni Ulanishni O'chirish
docker network disconnect <tarmoq_nomi> <konteyner_nomi>
- Misol:
  - docker network disconnect my-network my-ubuntu
- Berilgan konteynerni berilgan tarmoqdan uzadi.

## 5. Docker Hajmlari

### 5.1 Hajmlarni Ro'yxatga Olish
docker volume ls
- Barcha Docker hajmlarini ro'yxatga oladi.

### 5.2 Hajmni Yaratish
docker volume create <hajm_nomi>
- Misol:
  - docker volume create my-volume
- Yangi Docker hajmini yaratadi.

### 5.3 Hajmni O'chirish
docker volume rm <hajm_nomi>
- Misol:
  - docker volume rm my-volume
- Berilgan Docker hajmini o'chiradi.

### 5.4 Hajmni Konteynerga Ulanish
docker run -v <hajm_nomi>:<yo'l> --name <konteyner_nomi> <tasvir_nomi>:<tag>
- Misol:
  - docker run -v my-volume:/data --name my-ubuntu ubuntu:latest
- Berilgan hajmni konteynerga ulaydi.

### 5.5 Hajmni Ko'rish
docker volume inspect <hajm_nomi>
- Misol:
  - docker volume inspect my-volume
- Berilgan hajm haqida ma'lumot beradi.

## 6. Docker Compose (Qo'shimcha)

### 6.1 Docker Compose O'rnatilishi
Docker Compose ni o'rnatish uchun rasmiy hujjatlarni ko'ring: [Docker Compose ni o'rnatish](https://docs.docker.com/compose/install/)

### 6.2 Compose Faylini Ishga Tushirish
docker-compose up
- `docker-compose.yml` faylidagi xizmatlarni ishga tushiradi.

### 6.3 Compose Faylini To'xtatish
docker-compose down
- Barcha xizmatlarni to'xtatadi va ularning resurslarini tozalaydi.

### 6.4 Xizmatlarni Ro'yxatga Olish
docker-compose ps
- `docker-compose.yml` faylidagi xizmatlarni ro'yxatga oladi.

### 6.5 Xizmatni Yangilash
docker-compose up -d
- Xizmatlarni yangilab, orqa fonda ishga tushiradi.
