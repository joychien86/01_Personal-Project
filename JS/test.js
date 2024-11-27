document.addEventListener("mousemove", (e) => {
    const circles = document.querySelectorAll(".follow, .follow2, .follow3");

    circles.forEach((circle, index) => {
      gsap.to(circle, {
        duration: 0.3 + index * 0.1, // 調整移動速度
        x: e.pageX - circle.offsetWidth / 2, // 中心對準滑鼠位置
        y: e.pageY - circle.offsetHeight / 2,
        ease: "power2.out", // 平滑過渡
      });
    });
  });