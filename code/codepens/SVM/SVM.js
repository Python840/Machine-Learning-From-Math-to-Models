document.addEventListener("DOMContentLoaded", function () {
  /*******************************************************
   * Slides Content: Each slide contains:
   *  - explanationHTML: HTML for the left panel (explanations)
   *  - latexHTML: LaTeX/formula content for the right panel (slides 1–4)
   *  - show3D: Boolean flag (true on final slide to show Plotly graph)
   *  - finalSlide: Flag for additional interactivity on final slide
   *******************************************************/
  const slides = [
    {
      explanationHTML: `
        <h2>Step 1: The Dataset</h2>
        <p>
          Our 3D dataset contains points labeled as +1 or -1.
          The rule is: if \\(X_1+X_2+X_3 \\ge 12\\) then \\(y=+1\\); otherwise, \\(y=-1\\).
        </p>
        <p>What do we see on the right?</p>
      `,
      latexHTML: `
        <div class="big-latex">
          $$ 
          \\begin{array}{|c|c|c|c|}
          \\hline
          X_1 & X_2 & X_3 & y \\\\ \\hline
          5 & 4 & 4 & +1 \\\\ \\hline
          6 & 3 & 5 & +1 \\\\ \\hline
          3 & 5 & 3 & -1 \\\\ \\hline
          4 & 2 & 4 & -1 \\\\ \\hline
          7 & 3 & 2 & +1 \\\\ \\hline
          2 & 2 & 6 & -1 \\\\ \\hline
          \\end{array}
          $$
        </div>
        <p style="color:#ffa500;">
          Criteria: \\(X_1+X_2+X_3 \\ge 12 \\rightarrow y=+1\\); else, \\(y=-1\\).
        </p>
      `,
      show3D: false
    },
    {
      explanationHTML: `
        <h2>Step 2: The Guessed Hyperplane</h2>
        <p>
          We initially guess the hyperplane as <strong>\\(X_1+X_2+X_3=12\\)</strong>.
          In SVM terms, we set:
        </p>
        <ul>
          <li>\\(w_1 = 1\\)</li>
          <li>\\(w_2 = 1\\)</li>
          <li>\\(w_3 = 1\\)</li>
          <li>\\(b = -12\\)</li>
        </ul>
        <p>
          What do we see? The plane appears as a flat surface that separates our points.
        </p>
      `,
      latexHTML: `
        <div class="big-latex">
          $$ 
          \\text{Guessed: } w_1=1,\\;w_2=1,\\;w_3=1,\\;b=-12 \\quad\\Rightarrow\\quad X_1+X_2+X_3-12=0
          $$
        </div>
        <p>Does it separate the data? Yes—but is it optimal?</p>
      `,
      show3D: false
    },
    {
      explanationHTML: `
        <h2>Step 3: Lagrange Optimization</h2>
        <p>
          To maximize the margin, SVM minimizes \\(\\frac{1}{2}\\lVert w \\rVert^2\\)
          under the constraints:
        </p>
        <p>
          For points with \\(y=+1\\): \\(w\\cdot x+b\\ge 1\\) and for \\(y=-1\\): \\(w\\cdot x+b\\le -1\\).
          These combine into \\(y_i(w\\cdot x_i+b)\\ge 1\\).
        </p>
        <p>
          Lagrange multipliers \\(\\lambda_i\\) are introduced to solve:
        </p>
      `,
      latexHTML: `
        <div class="big-latex">
          $$ 
          \\begin{aligned}
          &\\min \\; \\frac{1}{2}\\lVert w \\rVert^2 \\\\
          &\\text{subject to } y_i(w\\cdot x_i+b)\\ge 1, \\; i=1,\\dots,n.
          \\end{aligned}
          $$
        </div>
        <div class="big-latex">
          $$ 
          L(w,b,\\lambda)=\\frac{1}{2}\\lVert w \\rVert^2-\\sum_{i=1}^{n}\\lambda_i\\Bigl( y_i(w\\cdot x_i+b)-1 \\Bigr)
          $$
        </div>
        <p>Setting \\(\\frac{\\partial L}{\\partial w}=0\\) and \\(\\frac{\\partial L}{\\partial b}=0\\)
          yields the conditions for optimality.
        </p>
      `,
      show3D: false
    },
    {
      explanationHTML: `
        <h2>Step 4: The Optimized Hyperplane & Calculation Steps</h2>
        <p>
          After solving, suppose we obtain:
        </p>
        <ul>
          <li>\\(w_1=4.5,\\;w_2=0.5,\\;w_3=-1\\)</li>
          <li>\\(b=-16.75\\)</li>
        </ul>
        <p>
          Let's see the calculation steps:
        </p>
      `,
      latexHTML: `
        <div class="big-latex">
          $$ 
          \\begin{aligned}
          w &= \\sum_{i=1}^{6} \\lambda_i y_i x_i \\\\
          &= 0.5\\times(5,4,4)+0.5\\times(6,3,5) \\;\\; (\\text{for } y=+1) \\\\
          &\\quad - 0.5\\times(3,5,3)-0.5\\times(4,2,4) \\;\\; (\\text{for } y=-1) \\\\
          &\\quad + 0.5\\times(7,3,2)-0.5\\times(2,2,6) \\\\
          &= (4.5,\\;0.5,\\;-1).
          \\end{aligned}
          $$
        </div>
        <div class="big-latex">
          $$ 
          \\begin{aligned}
          b &\\approx \\frac{\\Bigl[1-w\\cdot(5,4,4)\\Bigr]+\\Bigl[-1-w\\cdot(3,5,3)\\Bigr]}{2} \\\\
          &\\approx \\frac{(1-20.5)+(-1-13)}{2} = -16.75.
          \\end{aligned}
          $$
        </div>
        <p>These steps yield our optimized hyperplane.</p>
      `,
      show3D: false
    },
    {
      explanationHTML: `
        <h2>Step 5: Final Visualization</h2>
        <p>
          Below is the interactive 3D plot (red: \\(y=+1\\), blue: \\(y=-1\\)).
          Use the checkboxes below to toggle the hyperplanes:
        </p>
        <label><input type="checkbox" id="toggleGuessed" /> Show Guessed Hyperplane</label><br>
        <label><input type="checkbox" id="toggleOptimized" /> Show Optimized Hyperplane</label>
      `,
      latexHTML: `
        <p>
          <em>Guessed:</em> \\(w_1=1,\\;w_2=1,\\;w_3=1,\\;b=-12\\)<br>
          <em>Optimized:</em> \\(w_1=4.5,\\;w_2=0.5,\\;w_3=-1,\\;b=-16.75\\)
        </p>
      `,
      show3D: true,
      finalSlide: true
    }
  ];
  
  let currentSlide = 0;
  let plotInitialized = false;
  
  /******************************************************
   * DOM References
   ******************************************************/
  const leftContent = document.getElementById("left-content");
  const latexContainer = document.getElementById("latex-container");
  const plotContainer = document.getElementById("plot-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  // Fixed camera settings to preserve view
  const fixedCamera = { eye: { x: 1.3, y: 1.3, z: 1.3 } };
  
  /******************************************************
   * Render Slide Function
   ******************************************************/
  function renderSlide() {
    const slide = slides[currentSlide];
    
    // Set left panel content (explanations)
    leftContent.innerHTML = slide.explanationHTML;
    
    // Right panel: show LaTeX if not final slide, else show Plotly graph
    if (!slide.show3D) {
      latexContainer.style.display = "block";
      latexContainer.innerHTML = slide.latexHTML || "";
      plotContainer.style.display = "none";
      MathJax.typeset();
    } else {
      latexContainer.style.display = "none";
      plotContainer.style.display = "block";
      if (!plotInitialized) {
        initPlot();
        plotInitialized = true;
      }
    }
    
    // If final slide, set up toggle event listeners for checkboxes
    if (slide.finalSlide) {
      const toggleGuessed = document.getElementById("toggleGuessed");
      const toggleOptimized = document.getElementById("toggleOptimized");
      if (toggleGuessed && toggleOptimized) {
        toggleGuessed.checked = false;
        toggleOptimized.checked = false;
        // Use .then() to reapply fixed camera after restyle
        toggleGuessed.addEventListener("change", () => {
          Plotly.restyle('plot-container', { visible: toggleGuessed.checked ? true : false }, [2])
            .then(() => {
              Plotly.relayout('plot-container', { "scene.camera": fixedCamera });
            });
        });
        toggleOptimized.addEventListener("change", () => {
          Plotly.restyle('plot-container', { visible: toggleOptimized.checked ? true : false }, [3])
            .then(() => {
              Plotly.relayout('plot-container', { "scene.camera": fixedCamera });
            });
        });
      }
    }
    
    // Set navigation button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }
  
  /******************************************************
   * Navigation Event Listeners
   ******************************************************/
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      renderSlide();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      renderSlide();
    }
  });
  
  /******************************************************
   * Plotly 3D Visualization (Final Slide)
   * This uses Plotly.js to mimic our Matplotlib-style graph,
   * and includes toggle buttons to show/hide the hyperplanes.
   ******************************************************/
  function initPlot() {
    // Data points and labels
    const X_data = [
      [5, 4, 4],
      [6, 3, 5],
      [3, 5, 3],
      [4, 2, 4],
      [7, 3, 2],
      [2, 2, 6]
    ];
    const y_data = [1, 1, -1, -1, 1, -1];
  
    // Emulate Python's linspace
    function linspace(start, end, numPoints) {
      const arr = [];
      const step = (end - start) / (numPoints - 1);
      for (let i = 0; i < numPoints; i++) {
        arr.push(start + step * i);
      }
      return arr;
    }
  
    // Create meshgrid for x1 and x2
    const x1_range = linspace(1, 8, 30);
    const x2_range = linspace(1, 8, 30);
    let X1 = [], X2 = [];
    for (let i = 0; i < x1_range.length; i++) {
      let rowX1 = [];
      let rowX2 = [];
      for (let j = 0; j < x2_range.length; j++) {
        rowX1.push(x1_range[i]);
        rowX2.push(x2_range[j]);
      }
      X1.push(rowX1);
      X2.push(rowX2);
    }
  
    // --- Guessed Hyperplane ---
    // Equation: X1+X2+X3 = 12  =>  X3 = 12 - X1 - X2
    const w_guess = [1, 1, 1];
    const b_guess = -12;
    let X3_guess = [];
    for (let i = 0; i < X1.length; i++) {
      let row = [];
      for (let j = 0; j < X1[0].length; j++) {
        row.push((12 - w_guess[0]*X1[i][j] - w_guess[1]*X2[i][j]) / w_guess[2]);
      }
      X3_guess.push(row);
    }
  
    // --- Optimized Hyperplane ---
    // Equation: 4.5X1+0.5X2-X3 = 16.75  =>  X3 = (16.75 - 4.5X1 - 0.5X2)/(-1)
    const w_opt = [4.5, 0.5, -1];
    const b_opt = -16.75;
    let X3_opt = [];
    for (let i = 0; i < X1.length; i++) {
      let row = [];
      for (let j = 0; j < X1[0].length; j++) {
        row.push((16.75 - w_opt[0]*X1[i][j] - w_opt[1]*X2[i][j]) / w_opt[2]);
      }
      X3_opt.push(row);
    }
  
    // Separate points by class
    const X_pos = [], Y_pos = [], Z_pos = [];
    const X_neg = [], Y_neg = [], Z_neg = [];
    for (let i = 0; i < X_data.length; i++) {
      if (y_data[i] === 1) {
        X_pos.push(X_data[i][0]);
        Y_pos.push(X_data[i][1]);
        Z_pos.push(X_data[i][2]);
      } else {
        X_neg.push(X_data[i][0]);
        Y_neg.push(X_data[i][1]);
        Z_neg.push(X_data[i][2]);
      }
    }
  
    // Scatter traces for points
    const tracePos = {
      x: X_pos,
      y: Y_pos,
      z: Z_pos,
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        symbol: 'circle',
        size: 8,
        color: 'red',
        line: { color: 'black', width: 2 }
      },
      name: 'Class +1'
    };
  
    const traceNeg = {
      x: X_neg,
      y: Y_neg,
      z: Z_neg,
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        symbol: 'triangle-up',
        size: 8,
        color: 'blue',
        line: { color: 'black', width: 2 }
      },
      name: 'Class -1'
    };
  
    // Surface trace for guessed hyperplane (initially invisible)
    const surfaceGuess = {
      x: x1_range,
      y: x2_range,
      z: X3_guess,
      type: 'surface',
      name: 'Guessed Hyperplane',
      showscale: false,
      opacity: 0.3,
      visible: false,
      surfacecolor: X3_guess.map(row => row.map(() => 0)),
      colorscale: [[0, 'green'], [1, 'green']]
    };
  
    // Surface trace for optimized hyperplane (initially invisible)
    const surfaceOpt = {
      x: x1_range,
      y: x2_range,
      z: X3_opt,
      type: 'surface',
      name: 'Optimized Hyperplane',
      showscale: false,
      opacity: 0.6,
      visible: false,
      surfacecolor: X3_opt.map(row => row.map(() => 0)),
      colorscale: [[0, 'orange'], [1, 'orange']]
    };
  
    const data = [tracePos, traceNeg, surfaceGuess, surfaceOpt];
  
    const layout = {
      title: 'Comparison of Guessed vs. Optimized Hyperplane (SVM)',
      scene: {
        xaxis: { title: 'Feature 1 (X1)' },
        yaxis: { title: 'Feature 2 (X2)' },
        zaxis: { title: 'Feature 3 (X3)' },
        camera: { eye: fixedCamera.eye }
      },
      uirevision: 'constant'
    };
  
    Plotly.newPlot('plot-container', data, layout);
  }
  
  /******************************************************
   * Start the Presentation
   ******************************************************/
  renderSlide();
});
