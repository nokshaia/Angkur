import React, {Component} from 'react';
import styles from './Font.module.scss';
import Language from "../../../context/Language";
import LocalizedStrings from "react-localization";
import {numToBangla} from "../../../utility/UtilityFunc";

const localization = new LocalizedStrings({
   bn: {
      serif: 'মাত্রাযুক্ত',
      sansSerif: 'মাত্রাবিহিন',
      designedBy: 'ডিজাইন করেছেন',
      style: 'টি স্টাইল'
   },
   en: {
      serif: 'Serif',
      sansSerif: 'Sans Serif',
      designedBy: 'Designed by',
      style: 'Style'
   }
});


class Font extends Component {

   static contextType = Language;

   render() {
      localization.setLanguage(this.context.lang);
      let isLangEn = this.context.lang === 'en';
      let styleDescription = isLangEn ? (this.props.styles.length <= 1 ? "Style" : "Styles") : localization.style;

      let styleLink = `https://cdn.jsdelivr.net/gh/nokshaia/angkur@master/PublicFonts/${this.props.name.replace(/ /g, "")}/stylesheet.css`;
      //console.log("[Font.js] " + this.props.text);
      return (
          <div className={styles.font}>
             <link rel="stylesheet" href={styleLink}/>
             <textarea style={{fontFamily: this.props.name}}
                       autoComplete="off" autoCorrect="off"
                       autoCapitalize="off" spellCheck="false"
                       defaultValue={this.props.text}/>
             <hr/>
             <div className={styles.fontDetails}>

                <div className={styles.styleDetails}>
                   <i className="fas fa-pen-nib"/>
                   <h5>{this.props.type === '0' ? localization.serif : localization.sansSerif}</h5>
                </div>

                <h2>{this.props.name}</h2>
                <h5>{(isLangEn ? this.props.styles.length : numToBangla(this.props.styles.length)) + (isLangEn ? " " : "") + `${styleDescription}`}</h5>
                <h5>{`${localization.designedBy} ${this.props.author}`}</h5>
                <i className={"fas fa-plus-circle fa-fw " + styles.plusCircle}/>
             </div>
          </div>
      );
   }
}

export default Font;