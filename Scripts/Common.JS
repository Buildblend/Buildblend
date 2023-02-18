CommonPageData = {
  TopNavigation: document.querySelector(`#TopNavigation`),
  Footer: document.querySelector(`#Footer`)
};

function ApplyCommonPageData(Exceptions = [0]) {
  for (let i = 0; i < Exceptions.length; i++) {
    if (Exceptions[i] != window.location.pathname) {
      CommonPageData.TopNavigation.innerHTML = `
<a href="#Top">Home</a>
`;

      CommonPageData.Footer.innerHTML = `
<div>
  <h3>Connect</h3>
  <a href="https://github.com/Buildblend" target="_blank" rel="noopener">GitHub Organization</a><br>
</div>
<div>
  <h3>Links</h3>
  <a href="https://github.com/Buildblend/Buildblend" target="_blank" rel="noopener">GitHub Repository</a><br>
  <a href="sitemap.xml" target="_blank">Sitemap</a><br>
  <a href="CLI/ProductInstaller.bat.html" target="_self">ProductInstaller.bat</a>
</div>
<div>
  <p>Buildblend was founded in 2022. The goal we desire to achieve is simple: serve the technology through a large scale of seamless applications and tools.</p>
  <br>
  <a href="#Top">Back to Top!</a>
</div>
`;
    }
  }
};

ApplyCommonPageData();

document.body.innerHTML += `<a href="${window.location.protocol}//${window.location.host}" style="position: fixed; top: 0; left: 0; width: 12.5%;">
<img src="Media/Buildblend.png" style="width: 100%; height: 100%"></img>
</a>`;
