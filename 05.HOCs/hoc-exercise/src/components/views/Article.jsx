import React from 'react';
import withWarning from '../hocs/WithWarning';
import withError from '../hocs/WithError';


const Article = () => {
    return (
        <article>
            <header>
                <span className="title">Article Title</span>
            </header>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet magni labore voluptatibus. Vel sunt voluptate fugiat et ducimus voluptates doloremque, eum illo exercitationem dignissimos sequi cum, id molestiae debitis atque.</p>
        </article>
    );
};

const WithWarningArticle = withWarning(Article);
const WithErrorArticle = withError(Article);

export {
    WithWarningArticle,
    WithErrorArticle
}