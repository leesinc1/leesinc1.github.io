<html lang="en"><head>
  <meta charset="UTF-8">
  <title>��״����Ч��1</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
  </style>
</head>
<body>
<canvas id="cas" width="1536" height="594"></canvas> 

<script>
  var canvas = document.getElementById("cas");
  var ctx = canvas.getContext("2d");

  resize();
  window.onresize = resize;

  function resize() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();

  // �����ʱ����ȡ��������
  var warea = {x: null, y: null, max: 20000};
  window.onmousemove = function(e) {
    e = e || window.event;

    warea.x = e.clientX;
    warea.y = e.clientY;
  };
  window.onmouseout = function(e) {
    warea.x = null;
    warea.y = null;
  };

  // ��������
  // x��yΪ�������꣬xa, yaΪ����xy�����ٶȣ�maxΪ���ߵ���������
  var dots = [];
  for (var i = 0; i < 150; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var xa = Math.random() * 2 - 1;
    var ya = Math.random() * 2 - 1;

    dots.push({
      x: x,
      y: y,
      xa: xa,
      ya: ya,
      max: 6000
    })
  }

  // �ӳ�100�뿪ʼִ�ж�������������ִ����ʱλ�ü���������
  setTimeout(function() {
    animate();
  }, 100);

  // ÿһ֡ѭ�����߼�
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // �������������ӽ�ȥ������һ�����ڱȶԾ����ĵ�����
    var ndots = [warea].concat(dots);

    dots.forEach(function(dot) {

      // ����λ��
      dot.x += dot.xa;
      dot.y += dot.ya;

      // �����߽罫���ٶȷ���
      dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
      dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;

      // ���Ƶ�
      ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

      // ѭ���ȶ����Ӽ��ľ���
      for (var i = 0; i < ndots.length; i++) {
        var d2 = ndots[i];

        if (dot === d2 || d2.x === null || d2.y === null) continue;

        var xc = dot.x - d2.x;
        var yc = dot.y - d2.y;

        // ��������֮���ľ���
        var dis = xc * xc + yc * yc;

        // ������
        var ratio;

        // ������������֮���ľ���С�����Ӷ�����maxֵ�������������Ӽ仭��
        if (dis < d2.max) {

          // ���������꣬����������������λ���ƶ�
          if (d2 === warea && dis > (d2.max / 2)) {
            dot.x -= xc * 0.03;
            dot.y -= yc * 0.03;
          }

          // ����������
          ratio = (d2.max - dis) / d2.max;

          // ����
          ctx.beginPath();
          ctx.lineWidth = ratio / 2;
          ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      }

      // ���Ѿ������������Ӵ�������ɾ��
      ndots.splice(ndots.indexOf(dot), 1);
    });

    RAF(animate);
 }
</script>

</body></html> 