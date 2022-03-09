import React from 'react';

const Logo = ({ width, height, color }) => (
  <svg className="logo" width={width || 200} height={height || 53} viewBox="0 0 200 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.73 28.61c0 .47.09.9.27 1.27.2.38.46.73.81 1.04.36.3.78.6 1.28.86.5.25 1.06.5 1.68.74 1.17.47 2.24.94 3.2 1.4.98.45 1.8.96 2.48 1.5.7.54 1.23 1.16 1.6 1.84.38.67.57 1.46.57 2.36 0 1.07-.2 2.01-.61 2.81-.4.8-.96 1.48-1.66 2.03a7.4 7.4 0 0 1-2.48 1.23c-.93.27-1.93.4-3 .4-.74 0-1.48-.04-2.2-.13-.73-.1-1.43-.24-2.1-.44-.67-.2-1.3-.47-1.9-.8A7.97 7.97 0 0 1 0 43.52l.72-4.1 2.29.1c0 .82.05 1.52.17 2.09.1.57.27 1.05.47 1.43.25.24.54.44.87.6.34.15.69.27 1.05.37a8.67 8.67 0 0 0 2.3.24 4.52 4.52 0 0 0 3.08-1.05 3.36 3.36 0 0 0 1.27-2.66c.01-.64-.14-1.2-.43-1.7-.3-.5-.71-.95-1.25-1.35-.53-.41-1.17-.8-1.93-1.15a44.7 44.7 0 0 0-2.5-1.08c-.86-.34-1.64-.7-2.34-1.09-.7-.4-1.3-.84-1.8-1.33A5.05 5.05 0 0 1 .41 29.1a5.1 5.1 0 0 1 2.14-4.17c.71-.51 1.6-.92 2.64-1.22 1.05-.3 2.27-.44 3.67-.44a18.7 18.7 0 0 1 3.57.37c.53.12.99.28 1.37.47.39.18.67.4.84.66l-.03.32a36.06 36.06 0 0 1-.2 1.85l-.26 2.12-2-.14c0-.74-.06-1.36-.2-1.85a2.3 2.3 0 0 0-.64-1.16c-.3-.3-.71-.5-1.23-.6a8.81 8.81 0 0 0-1.97-.2c-.67 0-1.28.1-1.82.27-.54.16-1 .4-1.39.7a3.26 3.26 0 0 0-1.18 2.53ZM21.5 26.95c.02-.21.07-.44.14-.69l.24-.68.28-.74h2.01v4.94h4.92v.79c0 .23-.02.42-.06.56a.6.6 0 0 1-.2.31.63.63 0 0 1-.34.14c-.13.02-.3.03-.49.03h-3.83v9.05c0 .61.05 1.13.15 1.56.12.43.26.77.45 1.04.19.26.42.46.7.58a2.4 2.4 0 0 0 1.3.14l.42-.11.46-.14.13-1 .1-.95.12-.96 2-.16.16 4.14c-.63.32-1.36.55-2.17.69-.8.14-1.66.21-2.55.21-1.5 0-2.63-.39-3.4-1.16-.74-.78-1.12-1.97-1.12-3.57V31.6h-3.1v-.83c0-.26.06-.43.17-.52.12-.08.3-.13.55-.16l2.55-.32.4-2.83ZM37.94 33.46c.38-.6.75-1.16 1.12-1.67.37-.5.76-.95 1.17-1.31a4.7 4.7 0 0 1 3.16-1.16c.64 0 1.12.05 1.44.15.33.1.58.2.75.3L45.2 34h-1.38l-.36-2.23a31.57 31.57 0 0 1-1.04-.1c-.48 0-.98.14-1.5.44a6.18 6.18 0 0 0-2.46 2.82 4.74 4.74 0 0 0-.4 1.94v5.15c0 .42 0 .78.02 1.07.02.27.09.5.2.68.12.19.3.33.55.43.25.1.61.19 1.07.26l.14 1.28-2-.15a34.81 34.81 0 0 0-3.44 0c-.55.03-1.13.08-1.76.15l.07-1.28c.47-.06.84-.13 1.1-.21.26-.09.45-.2.56-.36.12-.15.2-.34.21-.58.02-.23.03-.53.03-.9v-9.88a4.56 4.56 0 0 0-.12-1.05 2.23 2.23 0 0 0-1.05-.23H31.9v-1.46a12.45 12.45 0 0 1 2.43-.27 11.65 11.65 0 0 1 2.52.05c.44.03.8.1 1.08.22v3.68ZM55.43 45.37c-.53.13-1.13.22-1.8.27-.68.06-1.42.1-2.25.1a4 4 0 0 1-.69-.07c-.22-.03-.42-.1-.6-.18-.19-.1-.34-.24-.46-.4-.12-.17-.17-.4-.17-.67 0-.5.01-1 .04-1.48.04-.5.06-1.06.06-1.7v-8.56a6.59 6.59 0 0 0-.1-1.21 3.4 3.4 0 0 0-1.32-.23h-1.48v-1.46a15.16 15.16 0 0 1 2.53-.27 11.65 11.65 0 0 1 2.53.05c.45.03.81.1 1.1.22v11.65a12.59 12.59 0 0 0 .26 2.56h2.2l.15 1.38ZM69.61 40.27a158.91 158.91 0 0 0-.18-7.53 4.05 4.05 0 0 0-.84-.69 6.44 6.44 0 0 0-3.18-.98c-.79 0-1.46.16-2.01.48-.55.31-1 .76-1.36 1.34-.35.58-.6 1.28-.76 2.1a14.7 14.7 0 0 0-.23 2.7c0 2.15.35 3.75 1.07 4.77.72 1.02 1.8 1.53 3.22 1.53a4.12 4.12 0 0 0 2.65-.98c.38-.32.7-.71.98-1.17.28-.47.49-1 .64-1.57Zm3.21 1.16a12.59 12.59 0 0 0 .26 2.56h2.64v1.31c-.52.14-1.1.24-1.77.31a20.05 20.05 0 0 1-3.1.08 1.52 1.52 0 0 1-.66-.16.9.9 0 0 1-.4-.42c-.08-.2-.12-.5-.12-.86v-.73a5.77 5.77 0 0 1-2.42 1.83 8.02 8.02 0 0 1-2.92.55c-.94 0-1.82-.17-2.64-.5a6.05 6.05 0 0 1-2.15-1.52 7.32 7.32 0 0 1-1.46-2.52c-.35-1-.53-2.17-.53-3.5 0-1.38.16-2.6.47-3.67a7.74 7.74 0 0 1 1.36-2.72c.6-.74 1.33-1.3 2.19-1.68a7.11 7.11 0 0 1 2.93-.58 7.2 7.2 0 0 1 2.8.52c.84.34 1.6.84 2.27 1.51v-6.38c0-.53-.04-.97-.1-1.33a5.34 5.34 0 0 0-1.34-.21h-1.48v-1.33c.52-.12 1.23-.22 2.12-.3a34.08 34.08 0 0 1 3.53-.1c.15 0 .29.01.4.03a6.6 6.6 0 0 1 .12 1.22v18.59ZM89.28 36.31a.27.27 0 0 0 .03-.12v-.14c0-.67-.07-1.3-.21-1.9a4.81 4.81 0 0 0-.64-1.61c-.3-.47-.69-.84-1.16-1.1a3.36 3.36 0 0 0-1.73-.41c-1.35 0-2.38.45-3.08 1.34-.7.9-1.09 2.21-1.18 3.94h7.97Zm2.98 6.67a5.23 5.23 0 0 1-2.4 2.23 9.01 9.01 0 0 1-3.71.69 9.77 9.77 0 0 1-3.36-.55c-1-.37-1.85-.9-2.56-1.6a7.35 7.35 0 0 1-1.64-2.61 9.97 9.97 0 0 1-.58-3.53c0-1.28.19-2.43.57-3.45.37-1.03.91-1.9 1.61-2.61a7.02 7.02 0 0 1 2.54-1.64 9.23 9.23 0 0 1 5.92-.15c.8.27 1.49.68 2.07 1.2a5.28 5.28 0 0 1 1.37 1.93c.34.76.5 1.62.5 2.58 0 .58-.05 1.04-.15 1.39-.1.35-.23.61-.43.8-.18.18-.42.3-.71.36-.29.05-.63.08-1.03.08h-8.95c.12 1.96.64 3.44 1.56 4.43.94.97 2.2 1.46 3.77 1.46.83 0 1.6-.13 2.31-.38a5.95 5.95 0 0 0 1.98-1.2l1.32.57ZM112.57 23.6l.4 1.96a107.8 107.8 0 0 1 .28 1.51 10.04 10.04 0 0 1 .14 1l-2.24.09-.13-.77a11.33 11.33 0 0 0-.35-1.43 4.73 4.73 0 0 0-1.46-.34 26.24 26.24 0 0 0-3.77-.06l-1.36.03-2.03.05v7.7h5.19c.2 0 .39-.02.56-.04.19-.03.35-.1.5-.2.16-.1.3-.28.42-.5.13-.23.25-.55.36-.96h.8c0 .92-.02 1.86-.06 2.8-.03.92-.08 1.8-.14 2.62h-.96a6.85 6.85 0 0 0-.37-.93 1.83 1.83 0 0 0-.4-.58 1.2 1.2 0 0 0-.51-.3c-.2-.05-.43-.08-.7-.08h-4.7v8.44h6.97c.52 0 .98-.05 1.39-.15.41-.1.7-.23.87-.37.08-.23.16-.55.23-.95.07-.4.13-.93.18-1.6a35.23 35.23 0 0 0 1.9.03v1.77a53.86 53.86 0 0 1-.15 2.87 11.37 11.37 0 0 1-2.18.4c-.45.05-1 .09-1.62.1a66.66 66.66 0 0 1-5.72-.07 93.47 93.47 0 0 0-3.51-.1c-.84 0-1.65 0-2.45.02-.78.02-1.58.09-2.4.19V43.6h1.35c.3 0 .59 0 .85-.02.27 0 .5-.05.72-.12.17-.43.25-1.04.25-1.85V27.61a5.8 5.8 0 0 0-.26-1.76c-.2-.08-.41-.13-.64-.14l-.75-.01h-1.7v-1.65c.99-.18 2.16-.3 3.51-.37 1.36-.06 2.8-.09 4.34-.09h9.35ZM128.63 29.78a13.63 13.63 0 0 1 2.5-.27 11.63 11.63 0 0 1 2.53.05c.45.03.8.1 1.1.22v1.46h-1.49c-.53 0-.98.08-1.34.23-.05.2-.08.43-.1.67V49.6c0 .37 0 .67.02.9.02.24.09.43.2.57.12.15.31.27.56.35.26.1.63.18 1.1.25l.08 1.34c-.58-.12-1.13-.2-1.66-.23a28.08 28.08 0 0 0-5.53.23l.12-1.34c.46-.07.81-.17 1.05-.28.26-.1.44-.25.55-.44.13-.2.2-.44.22-.73.02-.29.03-.65.03-1.09v-4.98a9.7 9.7 0 0 1-2.32 1.3 7.5 7.5 0 0 1-5.33-.06 6.32 6.32 0 0 1-2.23-1.59 7.98 7.98 0 0 1-1.51-2.67 11.51 11.51 0 0 1-.57-3.79c0-1.26.16-2.39.46-3.39.3-1 .74-1.83 1.3-2.52a5.63 5.63 0 0 1 2.06-1.55c.8-.37 1.7-.55 2.7-.55 1.11 0 2.13.16 3.06.47.92.3 1.74.73 2.44 1.28v-1.3Zm-.21 3.05a7.55 7.55 0 0 0-4.78-1.74c-1.23 0-2.14.54-2.7 1.62-.58 1.08-.86 2.7-.86 4.85 0 .98.08 1.87.24 2.66.18.78.44 1.46.78 2.02.36.56.81.99 1.36 1.3.55.3 1.2.45 1.96.45.9 0 1.68-.16 2.33-.49a6.1 6.1 0 0 0 1.67-1.2v-9.47ZM152.54 41.43a12.55 12.55 0 0 0 .26 2.56h2.46v1.31a18.38 18.38 0 0 1-5.04.38 1.7 1.7 0 0 1-.67-.16.9.9 0 0 1-.38-.44c-.08-.2-.13-.46-.13-.78v-.52l-.22.17-1 .7a7.89 7.89 0 0 1-2.69 1.07c-.55.12-1.2.18-1.93.18-1.55 0-2.68-.42-3.4-1.25-.7-.84-1.06-2.06-1.06-3.68v-8.1a6.1 6.1 0 0 0-.17-1.46 4.74 4.74 0 0 0-1.27-.17h-1.27v-1.46a14.39 14.39 0 0 1 1.51-.2 32.3 32.3 0 0 1 2.42-.11c.39 0 .76.03 1.11.08.36.04.66.11.9.23v10.38c0 .53.02 1.03.05 1.5.04.45.15.86.32 1.2.17.35.44.62.81.83.38.2.9.3 1.57.3.51 0 1.02-.08 1.53-.23.5-.16.97-.33 1.38-.52.41-.19.75-.37 1-.53a2 2 0 0 0 .41-.3c.12-.69.19-1.46.22-2.31.03-.86.04-1.75.04-2.67v-4.55c0-.59-.06-1.07-.18-1.47a4.76 4.76 0 0 0-1.25-.17h-1.27v-1.46a14.47 14.47 0 0 1 1.51-.2 32.47 32.47 0 0 1 2.42-.11c.38 0 .75.03 1.11.08.37.04.67.11.9.23v11.65ZM159.02 24.05c0-.65.19-1.17.58-1.56.4-.38.9-.58 1.5-.58.31 0 .6.05.85.15a1.9 1.9 0 0 1 1.08 1.1c.11.27.17.56.17.89 0 .3-.06.59-.17.85-.1.26-.24.48-.43.68-.18.18-.4.32-.65.42-.26.1-.54.16-.84.16-.3 0-.59-.05-.84-.16a2.1 2.1 0 0 1-.67-.42 2.11 2.11 0 0 1-.58-1.53Zm6.35 21.32c-.53.13-1.13.22-1.8.27a25 25 0 0 1-2.25.1 4 4 0 0 1-.69-.07c-.22-.03-.42-.1-.6-.18-.19-.1-.34-.24-.47-.4-.1-.17-.16-.4-.16-.67 0-.5.01-1 .04-1.48.04-.5.06-1.06.06-1.7v-8.56a6.72 6.72 0 0 0-.1-1.21 3.4 3.4 0 0 0-1.32-.23h-1.48v-1.46a15.2 15.2 0 0 1 2.53-.27 11.63 11.63 0 0 1 2.53.05c.45.03.81.1 1.1.22v11.65a12.57 12.57 0 0 0 .26 2.56h2.2l.15 1.38ZM170.04 26.95c.02-.21.07-.44.14-.69l.24-.68.28-.74h2.01v4.94h4.92v.79c0 .23-.02.42-.06.56a.6.6 0 0 1-.2.31.63.63 0 0 1-.34.14c-.13.02-.3.03-.49.03h-3.83v9.05c0 .61.05 1.13.16 1.56.1.43.25.77.44 1.04.2.26.43.46.7.58a2.4 2.4 0 0 0 1.3.14l.43-.11.45-.14a346.02 346.02 0 0 1 .35-2.91l2-.16.16 4.14c-.63.32-1.36.55-2.17.69-.8.14-1.66.21-2.55.21-1.5 0-2.63-.39-3.39-1.16-.75-.78-1.13-1.97-1.13-3.57V31.6h-3.1v-.83c0-.26.06-.43.17-.52.12-.08.3-.13.55-.16l2.55-.32.41-2.83ZM194.23 32.78l.21-.67.18-.64a1.47 1.47 0 0 0-.5-.17 3.24 3.24 0 0 0-.69-.06h-.85l.18-1.46c.4-.12.88-.2 1.45-.23a22.2 22.2 0 0 1 3.94 0 5.6 5.6 0 0 1 1.38.23v1.46h-.83a4.3 4.3 0 0 0-1.4.23.95.95 0 0 0-.1.12l-.16.37a69.14 69.14 0 0 0-.87 1.95l-6.34 14.62c-.39.88-.8 1.61-1.24 2.18a5.7 5.7 0 0 1-1.39 1.37c-.49.34-1.02.57-1.6.7a8.09 8.09 0 0 1-3.34.07c-.22-.03-.4-.07-.55-.12a.83.83 0 0 1-.3-.17l.33-2.13a6.72 6.72 0 0 0 3.52.3c.35-.1.68-.3 1-.63a5.9 5.9 0 0 0 .99-1.4c.34-.6.73-1.41 1.17-2.45l-5.7-13.45c-.1-.24-.2-.46-.31-.67a4.17 4.17 0 0 0-.4-.64c-.4-.16-.86-.23-1.39-.23h-.82l-.26-1.47a7 7 0 0 1 1.46-.24 39.03 39.03 0 0 1 4.69 0c.78.05 1.41.13 1.91.24l.23 1.47h-.84c-.27 0-.52.02-.75.06-.22.03-.4.08-.55.17a125.97 125.97 0 0 1 1.47 3.8l.82 2.06 2.22 5.57 4.03-10.14Z" fill={color} />
    <path d="M50.8 15.4 38.68 4.7 50.8 27.45 64.12 0 50.8 15.4Z" fill="#ED3724" />
  </svg>
);

export default Logo;
