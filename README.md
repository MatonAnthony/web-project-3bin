# La caissière

## Installation

### Développeur :
```shell
cd backend && npm start # Dans une console (pour garder les logs)
```

```shell
cd frontend && npm start # Dans une console separée (pour garder les logs)
```

La configuration du backend peut-être manipulé via la variable d'environnement NODE_ENV

### Production (experimental ):
Nous fournissons 4 containers dockers ainsi qu'un docker-compose.

Pour lancer les containers docker :

```shell
docker-compose build # Uniquement la première fois
```

```shell
docker-compose run # Les fois suivantes
```
