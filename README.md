# M2-TP1-WEB

_______________
### WEBCOMPONENTS
#### AudioPlayer

Go to public/index.html, and insert a custom component defined like this:

`<audio-player  src=""  >TITLE</audio-player>`

`src`  our source video declared with a path or link.

`TITLE `  Our title we want to display for our video component

#### VideoPlayer

Go to index.html on public/index.html, and insert a custom component defined like this:

`<video-player  src="" loop=true >TITLE</video-player>`

`src`  our source video declared with a path.

`loop`  accept true, any other values or undefined are considered as false.

`TITLE `  Our title we want to display for our video component

#### Re-usability of components:

Clone the project, and use the component folder as a module.\
To use it inside your favorite project, just import them like this:

Inside HTML:

`<script type="module" >
    import {AudioPlayer, VideoPlayer} from './src/index.js'
</script>`

Inside another javascript module:

`import {AudioPlayer, VideoPlayer} from './src/index.js'`

#### Examples

`<video-player  src="samples/sample.mp4" loop=true >Comfortably numb</video-player>`\
`<audio-lector src="samples/sample.mp3">Me playing guitar</audio-lector>`\
`<audio-lector src="samples/sample2.mp3">TOOL music</audio-lector>`

#### To understand how to edit the component:

Each component have a `template.js`, `style.js` and `index.js`.\
Template contains your HTML WebComponent body, and of course, the Style is also imported
inside the template.

Index contains a lot of methods, like play, pause, etc...

Good to know:\
You can check the `init()` function called inside constructor to understand
how the component is mounted over our custom lifecycle.
You can check every methods call inside `init()`. You will be able to add your
own event listeners, dom call and stuffs.

_______________

### How to run the project


#### Online demo:

[Buffa sound web component demo](https://buffa-sound.tk)

#### Local

Install dependencies:

`npm i` 

Install parcel:

`npm i -g parcel`

Be carefull using parcel, the cache system is horrible... provide another webserver service like
web server for chrome 200, that you can download at 
[this link](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb).
Then specify the public folder on your webserver.

Run the web server:

`npm start`

If it doesnt work, use your own live-server module.\
You can access to our webpage inside
`public/index.html` running your own webserver.\

Access to our regular html css JS application using parcel:

[http://localhost:1234](http://localhost:1234)


## TASKS:

### DONE:

- [x] Créer une  page HTML avec à l'intérieur un lecteur audio ou un lecteur video, vous pourrez reprendre le code d'exemples du MOOC présentant l'API des lecteurs audio et vidéo
 
- [x] Ajoutez à ce lecteur des boutons personnalisés pour play, stop, pause, retour à zéro, avancer 10s, reculer 10s, passer le lecteur en mode "loop" (à la fin de la vidéo ça recommence au début) etc. (vous pouvez ajouter d'autres choses...). Les boutons doivent être fonctionnels.
 
- [x] Reprenez le cours sur les WebComponents (transparents + le module 4.2 du MOOC HTML5 Apps and Games) et essayez de transformer le nouveau lecteur amélioré en \<my-player src="...." loop="...">titre du lecteur</myplayer>.

- [x] En ajoutant ce tag dans une page HTML cela doit fonctionner. Vous mettrez l'ensemble des codes JS  du WebComponent dans un fichier myPlayer/app.js. C'est ce fichier que vous importerez comme un JS module dans la page HTML pour que cela fonctionne.
 
- [x] Maintenant, regardez les module 1.5.1 à 1.5.4 du MOOC "HTML5 Apps and Games" sur l'API WebAudio. Prenez un peu de temps pour lire les sections jusqu'à l'exemple qui ajoute un equalizer de fréquences.
 Vous ajouterez dans le code de votre lecteur WebComponent de quoi régler le volume, la balance gauche/droite, et un égaliseur. Si vous vous sentez vous pourrez aussi rajouter un réglage de la réverbération comme proposé dans un autre exemple.
  
- [x] Maintenant, continuez la lecture du cours sur la WebAudio API et lisez les modules 1.5.5 à 1.5.7 sur les visualisations du signal audio. Vous ajouterez à votre WebComponent un ou plusieurs canvas pour visualiser tout d'abord les fréquences. Testez le résultat, n'oubliez pas de jouer sur vos réglages pour voir si cela affecte bien la visualisation.

- [x] Ajoutez maintenant la visualisation de la forme d'onde et des volumes. Ce serait bien d'avoir un switch fait avec webaudio controls pour passer d'une visualisation des fréquences à une visualisation de la forme d'onde (un toggle). J'aimerais vraiment avoir une visualisation des volumes comme dans le cours mais aussi à l'aide de vu-mètres à aiguille utilisant un webaudiocontrol comme celui présenté ici à la 4ème ligne, 1ère colonne (le Vintage_VuMeter).

- [x] Alors, avez-vous bien conçu votre WebComponent ? Avez-vous pensé à proposer une API pour que lui-aussi puisse être controlé de l'extérieur par du code JavaScript (par exemple, par quelqu'un qui l'aurait inclu dans sa propre page et qui voudrait l'augmenter, comme vous avez fait avec le WebComponent standard -car cela en est bien un- <audio> ou <video> ?

 ### DOING:
 
- [ ] On va maintenant cacher le lecteur audio et utiliser la librairie webaudiocontrols qui fournit des WebComponents pour l'audio (boutons rotatifs etc.). Vous importerez donc le fichier webaudiocontrols.js dans le code JavaScript de votre Web Component (import "lib/webaudiocontrols.js" par exemple, après avoir récupéré le fichier). La documentation d'utilisation montre comment ajouter des boutons rotatifs, des sliders, des switches, etc. par exemple pour le réglage du volume, de la balance, etc. Dans la doc on montre comment récupérer des images custom pour les boutons, sliders, etc. Il y a un très large choix (des centaines de spritesheets), à vous de vous amuser...


 ### TODO:
   
- [ ] Avez-vous utiliser le MVC (le fait que certains attributs puissent être "surveillés"). Par exemple, si on change par programme le volume, il faudrait que le bouton de volume tourne dans la GUI. Et oui, si vous rendez votre composant controllable via une API, vous allez être obligé de mettre en place ce système ! Essayez d'exposer au moins les réglages de volume et de balance dans une API (méthodes avec getter et setters + attributeChangeCallback, voir les transparents du cours).

 ### OPTIONNAL:
 
 - [ ] Pour les plus curieux, un tuto pour générer soi-même ses propres spritesheets webaudiocontrols : https://www.youtube.com/watch?v=z8_0_cJogP4

 