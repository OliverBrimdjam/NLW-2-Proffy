import React from 'react';
import './styles.css';
import  backIcon  from '../../assets/images/icons/back.svg';
import  logoImg  from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={ backIcon } alt="voltar"/>
                </Link>
                <img src={logoImg} alt="proffy"/>
            </div>
            <div className="header-content">
                <strong>{props.title}</strong>

                {props.children}
            </div>
        </header>
    );

}
export default PageHeader;