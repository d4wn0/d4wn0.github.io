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
