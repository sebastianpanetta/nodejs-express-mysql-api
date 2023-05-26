# Basic NodeJS - Express - MySQL REST API

## Get users

```
curl --location 'http://localhost:4000/api/users/'
```

## Get user

```
curl --location 'http://localhost:4000/api/users/:id'
```

## Create user

```
curl --location 'http://localhost:4000/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Test",
    "surname": "Test",
    "email": "Test@email.com"
}'
```

## Update user

```
curl --location --request PUT 'http://localhost:4000/api/users/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test2@email.com"
}'
```

## Delete user

```
curl --location --request DELETE 'http://localhost:4000/api/users/:id'
```