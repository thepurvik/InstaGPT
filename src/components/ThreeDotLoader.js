import React from 'react';

const ThreeDotLoader = () => {
  const snippets = document.querySelectorAll('.snippet');

  for (let i = 0; i < snippets.length; i++) {
    snippets[i].addEventListener('mouseleave', clearTooltip);
    snippets[i].addEventListener('blur', clearTooltip);
  }

  function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'snippet');
    e.currentTarget.removeAttribute('aria-label');
  }
  return (
    <>
      <div class='threedot-loader h-100'>
        <div class='snippet' data-title='dot-flashing'>
          <div class='stage'>
            <div class='dot-flashing'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThreeDotLoader;
