# La caissière
Le programme "La Caissière" est prévu pour faire du scalling horizontal et dispose donc de couches indépendantes. Il faudra donc paramétrer les différentes URLs nécessaires à la communication si le déploiement est fait sur différents serveurs.

## Installation Manuelle
L'installation peut se faire manuellement en allant dans les dossiers de frontend et de backend  pour y lancer un npm install. Concrètement cela donne:
```shell
cd backend && npm i && cd ../frontend && npm i
```
Il faut dans chacun de ces dossiers, une fois les dépendances installées, lancer les serveurs respectifs via un npm start.

```shell
cd backend && npm start
```
Dans une autre console :
```shell
cd frontend && npm start
```
Il faut également une base de donnée __MongoDB__ d'installée et de lancée contenant des produits.
Le fichier dbconfig.init peut être lancé pour entrer quelques produits dans la DB.

Les différentes variables d'environnement peuvent être configurées via NODE_ENV et le dossier de config.

### Production (experimental):
Nous fournissons 4 containers dockers ainsi qu'un docker-compose.

Pour lancer les containers docker :

```shell
docker-compose build # Uniquement la première fois
```

```shell
docker-compose run # Les fois suivantes
```
