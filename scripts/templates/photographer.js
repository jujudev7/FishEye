function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement( 'p' );
        location.classList.add('location');
        location.textContent = city + ', ' + country;
        const baseline = document.createElement( 'p' );
        baseline.classList.add('baseline');
        baseline.textContent = tagline;
        const pricing = document.createElement( 'p' );
        pricing.classList.add('pricing');
        pricing.textContent = price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(baseline);
        article.appendChild(pricing);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}