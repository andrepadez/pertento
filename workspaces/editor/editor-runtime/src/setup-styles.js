export const setupStyles = () => {
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.id = 'pertento-editor-styles';
  styleTag.innerHTML = styleCSS;
  document.head.appendChild(styleTag);
};

const styleCSS = `

.pertento-editor-selected {
  --color: #b4d455;
  outline: 5px solid red;
  background: 
     repeating-linear-gradient(
       135deg, 
       var(--color) 0, 
       #FFF 5px, 
       #FFF 5px, 
       var(--color) 5px, 
       var(--color) 5px);
}

`;
