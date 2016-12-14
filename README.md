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
Il faut également une base de donnée __MongoDB__ installée et lancée contenant des produits.
Le fichier dbconfig.init peut être copié/collé afin d'insérer quelques produits ainsi qu'un utilisateur de test
( login : projet ; mot de passe: projet).


Pour importer les données plus proprement qu'avec un copié/collé, il est possible de lancer la
commande suivante (nécessite que le mongorestore.exe fasse partie du path,
sinon rajoutez manuellement le chemin d'accès vers son exécutable dans la commande).
La commande ci-après nécessite que le serveur MongoDB soit en cours d'exécution. 
```shell
mongorestore.exe database/MongoDump
```

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
