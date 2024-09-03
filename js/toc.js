document.addEventListener("DOMContentLoaded", function() {
    const tocLinks = document.querySelectorAll("#toc a");
    const sections = document.querySelectorAll(".content h1, .content h2, .content h3, .content h4, .content h5, .content h6");
    const offset = 100; // 顶部固定导航栏的高度

    // 目录激活函数
    function activateLink() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const middlePosition = scrollY + windowHeight / 2 - 150;
        let closestIndex = -1;
        let closestDistance = Infinity;

        sections.forEach((section, i) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const distance = Math.abs(sectionTop - middlePosition);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        tocLinks.forEach((link) => link.classList.remove("active"));
        if (closestIndex !== -1 && tocLinks[closestIndex]) {
            tocLinks[closestIndex].classList.add("active");
        }
    }

    // 滑动跳转函数
    function scrollToSection(event, section) {
        event.preventDefault();  // 阻止默认的跳转行为
        const targetOffsetTop = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: targetOffsetTop,  // 精确滚动到目标位置
            behavior: "smooth"  // 平滑滚动
        });
    }

    // 添加点击事件监听器
    tocLinks.forEach((link, i) => {
        link.addEventListener("click", function(event) {
            scrollToSection(event, sections[i]);
        });
    });

    // 初始激活状态及滚动事件监听
    activateLink();
    window.addEventListener("scroll", activateLink);
    window.addEventListener("resize", activateLink);  // 处理视口大小变化时的调整
});



document.addEventListener('DOMContentLoaded', function() {  
    const toc = document.getElementById('toc');  
    const content = document.querySelector('.content');  
    const overlapThreshold = 0; // 通常，侧边栏和内容之间不应该有重叠，所以阈值设为0  
  
    function checkOverlapAndHideTocIfNeeded() {  
        // 首先检查屏幕宽度，但这不是判断重叠的必要条件  
        // 你可以根据需要保留或移除这个检查  
        if (window.innerWidth > 768) {  
            const tocRect = toc.getBoundingClientRect();  
            const contentRect = content.getBoundingClientRect();  
  
            // 检查 TOC 的右边界是否超过了内容区域的左边界  
            // 注意：这里不需要减去重叠阈值，因为我们通常不希望它们重叠  
            if (tocRect.right >= contentRect.left) {  
                toc.style.visibility = 'hidden'; // 隐藏 TOC  
            } else {  
                toc.style.visibility = 'visible'; // 显示 TOC  
            }  
        } else {  
            // 对于小屏幕，我们仍然使用 CSS 媒体查询来隐藏 TOC  
            // 但在这里，我们也可以通过 JavaScript 来做同样的事情  
            toc.style.visibility = 'hidden'; // 小屏幕时隐藏 TOC  
        }  
    }  
  
    // 监听窗口大小变化事件  
    window.addEventListener('resize', checkOverlapAndHideTocIfNeeded);  
  
    // 初始时检查一次  
    checkOverlapAndHideTocIfNeeded();  
}); 