# TO-DO LIST
⛔ Accessibilité
⛔ Responsive Lightbox
⛔ Responsive Modale
⛔ Vérifier Guide du Mentor

✅ Créer l'encart qui affiche le tarif journalier du photographe affiché
✅ Créer et Gérer le nombre de likes
✅ Griser/Masquer page quand modale ouverte ?
✅ LightBox 
✅ ContactForm : gérer conditions / erreurs / collecte
✅ TRI : html
✅ TRI : filter.js
✅ TRI : css
✅ Navigation Lightbox ne fonctionne plus une fois qu'on a fermé une 1ère fois la lightbox
✅ ESLint 
✅ Responsive Home
✅ Responsive Photographer

⛔ Gérer le focus :
Les pseudo-classes dont vous aurez besoin pour les liens seront :
    • :active qui “permet de cibler un élément lorsque celui-ci est activé par l'utilisateur” (par exemple, quand l’utilisateur a cliqué dessus) ;
    • :hover qui permet de spécifier l'apparence d'un élément au moment où l'utilisateur le survole avec le pointeur, sans nécessairement l'activer ;
    • :link qui cible tous les liens n’ayant pas encore été visités ;
    • :visited concernant tous les liens visités ;
    • :focus qui permet de cibler un élément lorsque celui-ci reçoit le focus (élément sélectionné au clavier ou à la souris).
- remplacer div par class ou balises html
✅ Afficher infos photographe sur page photographer.html
⛔ ATTENTION au contraste, font NOIR sur fond orangé ??

## ACCESSIBILITÉ
- ARIA
- sémantique HTML
- img
- clavier
- ALT

## ISSUES
- Gérer le zoom sur visages de certaines photos des Photographes (cf. Figma)
- Title media (fr/en)
- Réduire dimensions img à la mano ? (trop lourdes) **PhotoFiltre** library JS (Sharp)
- Remplir DOC / TUTOS

## Le code est complet quand :
❒ Aucun bug n'est rencontré.  
❒ Aucune erreur n'est affichée dans la console.  
❒ Le **pattern Factory** est utilisé pour générer différents éléments de DOM pour les vidéos ou les photos.  
❒ Le DOM est généré via du JavaScript basé sur le **fichier JSON** fourni, au lieu d'être écrit à la main.  
❒ Il comprend tous les photographes et les images fournies.  
❒ Les pages des photographes sont générées en utilisant un unique fichier HTML.  
❒ Le design correspond aux **maquettes**.

❒ Le code passe les **tests ESLint** par défaut. (Remarque : les étudiants sont autorisés à faire taire certains avertissements ESLint s'ils peuvent le justifier durant la soutenance).  
❒ Le code est **bien commenté**, ce qui signifie que toute intention qui ne peut être immédiatement comprise en regardant le code lui-même peut être comprise en lisant les commentaires.  
❒ Les **identificateurs** tels que les noms de classe, de méthode et de variable décrivent leur but avec exactitude et précision.  
❒ Les versions récentes de JavaScript sont utilisées sans caractéristiques dépréciées.

❒ Des éléments HTML pertinents et spécifiques sont choisis (ex. : < nav >, < article > au lieu d'utiliser < div > et < span > pour tout).
❒ Les **balises ARIA** sont utilisées pour décrire des éléments personnalisés.  
❒ Les balises d'accessibilité passent le **test AChecker** sans "known issues".  
❒ Le site est **navigable avec un clavier**.
❒ La **lightbox** est navigable avec un clavier.  
❒ Le site fournit un **texte alternatif** pour toutes les images et vidéos afin de garantir l'accessibilité aux lecteurs d'écran. 

❒ Les **event listeners** sont utilisés pour répondre à toutes les interactions au clavier ou à la souris.  
❒ Lorsque l'utilisateur clique sur la vignette d'un photographe sur la page d'accueil, il est amené sur une page spécifique à ce photographe.  
❒ Lorsque l'utilisateur clique sur l'**icône "like"** sur la page du photographe, il incrémente le nombre de "like".  
❒ Les **médias peuvent être triés** par popularité, date ou titre en cliquant sur le filtre de tri souhaité.  
❒ Lorsque l'utilisateur clique sur un élément média sur la page du photographe, l’élément est affiché dans une modale type **lightbox**.    
❒ La lightbox peut être fermée en cliquant sur une croix dans le coin.   
❒ La lightbox présente des **boutons de navigation** sur le côté pour passer d'un média à un autre (les utilisateurs peuvent cliquer sur ces boutons pour naviguer).  
❒ Un bouton de contact cliquable sur la page du photographe lance une **modale**, qui comprend des champs pour le nom, l'e-mail et le message.  
❒ L'envoi du **formulaire** (via le bouton Envoyer) permet d’afficher le contenu des 3 champs dans la console.

❒ La page d'accueil répertorie tous les photographes avec leur nom, leur slogan, leur lieu, leur prix/heure et une image miniature.  
❒ La page de chaque photographe présente une **galerie** avec des photos et des vidéos.  
❒ Chaque média sur la page du photographe comprend le titre et le nombre de likes.  
❒ Le **nombre total** de photos aimées par un photographe est indiqué.   
❒ Toutes les pages demandées sont cohérentes avec les maquettes.

## Pour aller + loin...
❒ Utiliser des **linters** pour le HTML et le CSS également ;  
❒ Respecter le guide de style Google HTML/CSS : https://google.github.io/styleguide/htmlcssguide.html  
❒ Lire le guide MDN sur l'accessibilité : https://google.github.io/styleguide/htmlcssguide.html 

