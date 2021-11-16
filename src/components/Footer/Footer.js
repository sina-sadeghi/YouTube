import React from 'react';
import './Footer.css';
import telegram from '../../images/Telegram.svg';
import whatsapp from '../../images/Whatsapp.svg';
import github from '../../images/Github.svg';
import gmail from '../../images/Gmail.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="justPractice">This website is made for practice only</div>
            <div className="creator">
                Creator: <ins>sina sadeghi</ins> <br/>
                <a href="mailto: sinasadeghi070@gmail.com"><img src={gmail} /></a>
                <a href="https://github.com/sina-sadeghi"><img src={github} /></a>
                <a href="https://t.me/s_30na"><img src={telegram} /></a>
                <a href="https://api.whatsapp.com/qr/WWBSENSY2LXOG1"><img src={whatsapp} /></a>
            </div>
            <div className="freeSite">Any use of this website is unrestricted</div>
        </div>
    );
};

export default Footer;