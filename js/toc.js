// 第一段代码：处理目录链接激活和滚动行为
document.addEventListener("DOMContentLoaded", function() {
    const tocLinks = document.querySelectorAll("#toc a");
    const sections = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    function activateLink() {
        let index = sections.length;

        while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

        tocLinks.forEach((link) => link.classList.remove("active"));
        if (tocLinks[index]) {
            tocLinks[index].classList.add("active");
        }
    }

    function scrollToSection(event, section) {
        event.preventDefault();  // 阻止默认的跳转行为
        const targetOffsetTop = section.offsetTop;
        window.scrollTo({
            top: targetOffsetTop - 100,  // 调整偏移量以考虑顶部固定的导航栏或其他元素
            behavior: "smooth"  // 平滑滚动
        });
    }

    tocLinks.forEach((link, i) => {
        link.addEventListener("click", function(event) {
            scrollToSection(event, sections[i]);
        });
    });

    activateLink();
    window.addEventListener("scroll", activateLink);
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


