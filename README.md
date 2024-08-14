Le projet est un template pour rapidement mettre en production des applications utilisant React Django et PostGreSQL.

Les différents containers construits sont :

- React
- Django
- PostgreSQL
- PgAdmin

Le dossier src est séparé en deux :
- `_install` : contenant les fichiers Docker pour construire les containers
- `persistant_data` : contenant les fichiers peristants

## Dossier _install
Dans le fichier src/_install/ :  
- un docker-compose.yml 
- un dossier _container

Dans ce dossier _container on a un dossier par container :
- le front : `react-front`
- le back : `django-api`.

# Instructions

## 1. Définition des variables d'environnement

On créé un fichier .env par container.  
On va pour cela créé deux nouveaux dossiers dans `_install` :
- `postgresql`
- `pgadmin`

Dans `django-api`, on place un `.env` avec les variables suivantes :
```
    SECRET_KEY=<Your Secret Key>
    DEBUG=
    ALLOWED_HOSTS='127.0.0.1 localhost'
    
    DJANGO_SUPERUSER_USERNAME=<Your django superuser username>
    DJANGO_SUPERUSER_EMAIL=<Your django superuser email>
    DJANGO_SUPERUSER_PASSWORD=<Your django superuser password>
    
    CORS_ALLOW_CREDENTIALS=True
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    CORS_ORIGIN_WHITELIST=http://localhost:3000
    
    POSTGRES_DB=<Your postgres database name>
    POSTGRES_USER=<Your postgres database user>
    POSTGRES_PASSWORD=<Your postgres database password>
    POSTGRES_ENGINE=django.db.backends.postgresql
    POSTGRES_HOST=db_postgres
    POSTGRES_PORT=5432
```

Dans `react-front`, on place un `.env` avec
```
COMPOSE_HTTP_TIMEOUT=120
WATCHPACK_POLLING=true
```

Dans `postgresql`, on place un `.env` avec
```
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

Dans `pgadmin`, on place un `.env` avec
```
PGADMIN_DEFAULT_EMAIL=<pgadmin_email>
PGADMIN_DEFAULT_PASSWORD=<pgadmin_password>
```

## 2. Commandes Docker

`docker-compose build`  
`docker-compose -p react-docker up -d`
