<br>
            <canvas id="myCanvas" width="210" height="210"></canvas>
            <script>
                var canvas = document.getElementById("myCanvas");
                var c = canvas.getContext('2d');
                var W = canvas.width;
                var H = canvas.height;

                function flipCoin() {
                    var flip = Math.floor(Math.random() * 2);
                    console.log(flip);

                    if (flip === 0) {
                        winner(105, 105, "Gold");
                    } else {
                        looser(105, 105, "Silver");
                    }
                }

                function winner(xLoc, yLoc, color) {
                    c.clearRect(0, 0, W, H);
                    c.beginPath();
                    c.fillStyle = color;
                    c.strokeStyle = "Black";
                    c.lineWidth = 5;
                    c.arc(xLoc, yLoc, 100, 0, 2 * Math.PI);
                    c.fill();
                    c.stroke();
                    c.closePath();
                }

                function looser(xLoc, yLoc, color) {
                    c.clearRect(0, 0, W, H);
                    c.beginPath();
                    c.fillStyle = color;
                    c.strokeStyle = "Black";
                    c.lineWidth = 5;
                    c.arc(xLoc, yLoc, 100, 0, 2 * Math.PI);
                    c.fill();
                    c.stroke();
                    c.closePath();
                }
            </script>