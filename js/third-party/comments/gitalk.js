/* global NexT, CONFIG, Gitalk, md5 */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('.gitalk-container');
  await NexT.utils.getScript(CONFIG.gitalk.js, {
    condition: window.Gitalk
  });

  // 获取当前的路径，并进行 MD5 加密
  // 这是为了确保 ID 永远是合法的 32 位字符，解决 btoa 报错
  var gitalkId = md5(location.pathname);

  const gitalk = new Gitalk({
    clientID           : CONFIG.gitalk.client_id,
    clientSecret       : CONFIG.gitalk.client_secret,
    repo               : CONFIG.gitalk.repo,
    owner              : CONFIG.gitalk.github_id,
    admin              : [CONFIG.gitalk.admin_user],
    
    // 【核心修改】这里不再读取配置，而是直接使用我们算好的 MD5
    id                 : gitalkId,
    
    proxy              : CONFIG.gitalk.proxy,
    language           : CONFIG.gitalk.language || window.navigator.language,
    distractionFreeMode: CONFIG.gitalk.distraction_free_mode
  });
  
  gitalk.render(document.querySelector('.gitalk-container'));
});