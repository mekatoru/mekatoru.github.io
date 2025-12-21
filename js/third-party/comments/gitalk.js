/* global NexT, CONFIG, Gitalk */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('.gitalk-container');
  await NexT.utils.getScript(CONFIG.gitalk.js, {
    condition: window.Gitalk
  });

  // 【核心修改】
  // 直接获取当前页面的路径（例如 /posts/cef494bd/）
  // 因为你装了 abbrlink，这个路径现在是纯英文的，绝对安全！
  var cleanId = location.pathname;
  console.log("正在尝试使用的ID是：", cleanId);
  console.log("这个ID是Latin1吗？", /^[\u0000-\u00ff]*$/.test(cleanId));
  // 双重保险：如果路径太长（极小概率），截取前50个字符
  if (cleanId.length > 50) {
    cleanId = cleanId.substring(0, 50);
  }

  const gitalk = new Gitalk({
    clientID           : CONFIG.gitalk.client_id,
    clientSecret       : CONFIG.gitalk.client_secret,
    repo               : CONFIG.gitalk.repo,
    owner              : CONFIG.gitalk.github_id,
    admin              : [CONFIG.gitalk.admin_user],
    
    // 强制使用浏览器地址栏的路径作为 ID
    id                 : cleanId,
    
    proxy              : CONFIG.gitalk.proxy,
    language           : CONFIG.gitalk.language || window.navigator.language,
    distractionFreeMode: CONFIG.gitalk.distraction_free_mode
  });
  
  gitalk.render(document.querySelector('.gitalk-container'));
});