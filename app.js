// Data Storage (In-Memory)
let appState = {
  currentDay: 1,
  completedTasks: [],
  totalPoints: 0,
  todayPoints: 0,
  weekPoints: 0,
  monthPoints: 0,
  streak: 0,
  longestStreak: 0,
  achievements: [],
  lastCompletedDay: 0,
  completedDays: [],
  taskPointsMap: {}
};

let confirmCallback = null;

// Application Data
const months = [
  { number: 1, title: "Foundation Strengthening & Programming Mastery", icon: "💻", focus: "Programming fundamentals, Linux internals, Algorithm practice" },
  { number: 2, title: "Cloud Architecture & Infrastructure as Code", icon: "☁️", focus: "GCP mastery, Terraform, CI/CD pipelines" },
  { number: 3, title: "Observability, Monitoring & SRE Principles", icon: "📊", focus: "Prometheus, Grafana, SLI/SLO/Error Budgets" },
  { number: 4, title: "Distributed Systems & Kubernetes", icon: "🏗️", focus: "System Design, NALSD, CKA certification" },
  { number: 5, title: "Incident Management & Interview Prep", icon: "🚨", focus: "On-call training, Chaos engineering, Mock interviews" },
  { number: 6, title: "Mock Interviews & Applications", icon: "🎯", focus: "Full mocks, Resume optimization, Google applications" }
];

const achievements = [
  { id: "start", name: "Getting Started", icon: "🏁", description: "Complete Day 1", target: 1, type: "day" },
  { id: "week1", name: "Week Warrior", icon: "🔥", description: "7 consecutive days", target: 7, type: "streak" },
  { id: "coder", name: "Code Master", icon: "💻", description: "50 coding tasks", target: 50, type: "category", category: "Coding" },
  { id: "linux", name: "Linux Guru", icon: "🐧", description: "50 Linux tasks", target: 50, type: "category", category: "Linux" },
  { id: "cloud", name: "Cloud Expert", icon: "☁️", description: "Complete Month 2", target: 60, type: "day" },
  { id: "sre", name: "SRE Pro", icon: "📊", description: "Complete Month 3", target: 90, type: "day" },
  { id: "architect", name: "System Designer", icon: "🏗️", description: "Complete Month 4", target: 120, type: "day" },
  { id: "interview", name: "Interview Ready", icon: "🎯", description: "10 mock interviews", target: 10, type: "category", category: "Interview" },
  { id: "finish", name: "Google Bound", icon: "🚀", description: "Complete Day 180", target: 180, type: "day" }
];

const milestones = [
  { name: "100 LeetCode Problems Solved", day: 30, bonus: 500 },
  { name: "Google Cloud DevOps Certification", day: 60, bonus: 1000 },
  { name: "CKA Certification", day: 120, bonus: 1000 },
  { name: "First Mock Interview", day: 150, bonus: 300 },
  { name: "Google Application Submitted", day: 180, bonus: 500 }
];

const quotes = [
  "Every expert was once a beginner. Start today!",
  "Google awaits your talent. Keep pushing!",
  "Consistency beats intensity. Show up daily!",
  "SRE is a journey, not a destination.",
  "One day at a time toward your Google dream.",
  "Your dedication today builds your tomorrow.",
  "Progress, not perfection. Keep learning!",
  "The best time to start was yesterday. The next best time is now."
];

// Generate 180 days of tasks (expanding on the sample data)
const dailyTasks = [];
for (let day = 1; day <= 180; day++) {
  const tasks = [];
  
  // Determine month and adjust task types accordingly
  const month = Math.ceil(day / 30);
  
  if (month === 1) {
    // Month 1: Foundation & Programming
    const leetcodeTopics = [
      'https://leetcode.com/tag/array/',
      'https://leetcode.com/tag/string/',
      'https://leetcode.com/tag/hash-table/',
      'https://leetcode.com/tag/linked-list/'
    ];
    tasks.push({
      id: `d${day}t1`,
      title: `LeetCode: 3 ${['Array', 'String', 'Hash Table', 'Two Pointers'][day % 4]} Problems`,
      description: `Solve 3 ${['easy', 'easy', 'medium'][day % 3]} problems to build your algorithm skills`,
      duration: "60min",
      category: "Coding",
      points: 15,
      resources: leetcodeTopics[day % 4],
      preTask: "Review problem patterns and data structures",
      postTask: "Document solutions and time complexity"
    });
    const linuxResources = [
      'https://linuxjourney.com/',
      'https://www.kernel.org/doc/html/latest/filesystems/',
      'https://www.brendangregg.com/linuxperf.html',
      'https://www.geeksforgeeks.org/linux-tutorial/'
    ];
    tasks.push({
      id: `d${day}t2`,
      title: `Linux: ${['Process Management', 'File Systems', 'Networking', 'Shell Scripting'][day % 4]}`,
      description: `Deep dive into ${['ps, top, htop commands', 'inode, mount, df commands', 'netstat, ss, tcpdump', 'bash scripting basics'][day % 4]}`,
      duration: "90min",
      category: "Linux",
      points: 20,
      resources: linuxResources[day % 4],
      preTask: "Set up Linux environment or WSL",
      postTask: "Practice commands and create cheat sheet"
    });
    if (day % 3 === 0) {
      tasks.push({
        id: `d${day}t3`,
        title: "System Design Basics",
        description: "Study fundamental concepts of scalable systems",
        duration: "45min",
        category: "Design",
        points: 15,
        resources: "https://github.com/donnemartin/system-design-primer",
        preTask: "Review previous system design notes",
        postTask: "Create design diagrams"
      });
    }
  } else if (month === 2) {
    // Month 2: Cloud & Infrastructure
    const gcpResources = [
      'https://cloud.google.com/compute/docs',
      'https://cloud.google.com/storage/docs',
      'https://cloud.google.com/functions/docs',
      'https://cloud.google.com/load-balancing/docs'
    ];
    tasks.push({
      id: `d${day}t1`,
      title: `GCP: ${['Compute Engine', 'Cloud Storage', 'Cloud Functions', 'Load Balancing'][day % 4]}`,
      description: `Learn and practice GCP ${['VM management', 'object storage', 'serverless', 'traffic distribution'][day % 4]}`,
      duration: "90min",
      category: "Cloud",
      points: 25,
      resources: gcpResources[day % 4],
      preTask: "Set up GCP free tier account",
      postTask: "Complete hands-on lab exercises"
    });
    tasks.push({
      id: `d${day}t2`,
      title: "Terraform Infrastructure",
      description: "Build infrastructure as code with Terraform",
      duration: "75min",
      category: "Cloud",
      points: 20,
      resources: "https://developer.hashicorp.com/terraform/tutorials",
      preTask: "Install Terraform CLI",
      postTask: "Deploy sample infrastructure"
    });
    tasks.push({
      id: `d${day}t3`,
      title: "LeetCode: Algorithm Practice",
      description: "Continue daily coding practice",
      duration: "45min",
      category: "Coding",
      points: 15,
      resources: "https://leetcode.com/company/google/",
      preTask: "Review algorithm patterns",
      postTask: "Analyze solution complexity"
    });
  } else if (month === 3) {
    // Month 3: Monitoring & SRE
    const monitoringResources = [
      'https://prometheus.io/docs/prometheus/latest/getting-started/',
      'https://grafana.com/docs/grafana/latest/getting-started/',
      'https://prometheus.io/docs/alerting/latest/alertmanager/',
      'https://prometheus.io/docs/prometheus/latest/querying/basics/'
    ];
    tasks.push({
      id: `d${day}t1`,
      title: `Monitoring: ${['Prometheus Setup', 'Grafana Dashboards', 'Alertmanager', 'PromQL Queries'][day % 4]}`,
      description: `Master ${['metric collection', 'visualization', 'alert routing', 'query language'][day % 4]} for observability`,
      duration: "90min",
      category: "Monitoring",
      points: 25,
      resources: monitoringResources[day % 4],
      preTask: "Install monitoring tools",
      postTask: "Create custom dashboards"
    });
    tasks.push({
      id: `d${day}t2`,
      title: "SRE Principles: SLI/SLO/Error Budgets",
      description: "Study reliability engineering fundamentals",
      duration: "60min",
      category: "Monitoring",
      points: 20,
      resources: "https://sre.google/sre-book/table-of-contents/",
      preTask: "Read SRE book chapter",
      postTask: "Define SLOs for sample service"
    });
    tasks.push({
      id: `d${day}t3`,
      title: "Linux Performance Tuning",
      description: "Advanced Linux system optimization",
      duration: "60min",
      category: "Linux",
      points: 18,
      resources: "https://www.brendangregg.com/linuxperf.html",
      preTask: "Review system metrics",
      postTask: "Practice performance analysis"
    });
  } else if (month === 4) {
    // Month 4: Kubernetes & System Design
    const k8sResources = [
      'https://kubernetes.io/docs/concepts/workloads/pods/',
      'https://kubernetes.io/docs/concepts/services-networking/',
      'https://kubernetes.io/docs/concepts/configuration/',
      'https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/'
    ];
    tasks.push({
      id: `d${day}t1`,
      title: `Kubernetes: ${['Pods & Deployments', 'Services & Ingress', 'ConfigMaps & Secrets', 'StatefulSets'][day % 4]}`,
      description: `Deep dive into K8s ${['workloads', 'networking', 'configuration', 'stateful apps'][day % 4]}`,
      duration: "90min",
      category: "Cloud",
      points: 25,
      resources: k8sResources[day % 4],
      preTask: "Set up local K8s cluster",
      postTask: "Deploy sample applications"
    });
    tasks.push({
      id: `d${day}t2`,
      title: "System Design Practice",
      description: "Design scalable distributed systems",
      duration: "75min",
      category: "Design",
      points: 22,
      resources: "https://github.com/donnemartin/system-design-primer",
      preTask: "Review design patterns",
      postTask: "Document architecture decisions"
    });
    tasks.push({
      id: `d${day}t3`,
      title: "CKA Exam Preparation",
      description: "Practice for Certified Kubernetes Administrator",
      duration: "60min",
      category: "Cloud",
      points: 20,
      resources: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
      preTask: "Review CKA curriculum",
      postTask: "Complete practice questions"
    });
  } else if (month === 5) {
    // Month 5: Incident Management
    tasks.push({
      id: `d${day}t1`,
      title: `Incident Response: ${['Detection', 'Mitigation', 'Root Cause Analysis', 'Post-Mortem'][day % 4]}`,
      description: `Learn ${['monitoring alerts', 'quick fixes', 'investigation', 'documentation'][day % 4]} for incidents`,
      duration: "75min",
      category: "Monitoring",
      points: 23,
      resources: "https://sre.google/workbook/table-of-contents/",
      preTask: "Study incident examples",
      postTask: "Write sample post-mortem"
    });
    tasks.push({
      id: `d${day}t2`,
      title: "Chaos Engineering Practice",
      description: "Test system resilience with controlled failures",
      duration: "60min",
      category: "Monitoring",
      points: 20,
      resources: "https://principlesofchaos.org/",
      preTask: "Review chaos principles",
      postTask: "Run chaos experiments"
    });
    tasks.push({
      id: `d${day}t3`,
      title: "Interview Preparation",
      description: "Practice behavioral and technical questions",
      duration: "60min",
      category: "Interview",
      points: 18,
      resources: "https://www.pramp.com/",
      preTask: "Prepare STAR stories",
      postTask: "Record practice session"
    });
  } else {
    // Month 6: Final Prep & Applications
    tasks.push({
      id: `d${day}t1`,
      title: "Mock Interview: Full Stack",
      description: "Complete end-to-end technical interview simulation",
      duration: "90min",
      category: "Interview",
      points: 30,
      resources: "https://interviewing.io/",
      preTask: "Review all technical areas",
      postTask: "Analyze feedback and improve"
    });
    tasks.push({
      id: `d${day}t2`,
      title: "System Design Mock Interview",
      description: "Practice designing large-scale systems",
      duration: "60min",
      category: "Interview",
      points: 25,
      resources: "https://www.pramp.com/",
      preTask: "Study common design patterns",
      postTask: "Document design approach"
    });
    tasks.push({
      id: `d${day}t3`,
      title: "Resume & Application Polish",
      description: "Optimize resume and prepare applications",
      duration: "45min",
      category: "Interview",
      points: 15,
      resources: "https://www.techinterviewhandbook.org/",
      preTask: "Review job descriptions",
      postTask: "Submit applications"
    });
  }
  
  dailyTasks.push({ day, tasks });
}

// Initialize App
function init() {
  renderMonthNav();
  renderAchievements();
  renderMilestones();
  displayRandomQuote();
  loadDay(appState.currentDay);
  updateAllDisplays();
}

// Render Month Navigation
function renderMonthNav() {
  const nav = document.getElementById('monthNav');
  nav.innerHTML = months.map(month => `
    <button class="month-btn" onclick="jumpToMonth(${month.number})" id="month${month.number}Btn">
      <div style="font-size: 20px; margin-bottom: 4px;">${month.icon}</div>
      <div style="font-weight: 600;">Month ${month.number}</div>
      <div style="font-size: 11px; opacity: 0.8; margin-top: 4px;">${month.title}</div>
    </button>
  `).join('');
  updateMonthNavHighlight();
}

// Update Month Nav Highlight
function updateMonthNavHighlight() {
  const currentMonth = Math.ceil(appState.currentDay / 30);
  months.forEach(month => {
    const btn = document.getElementById(`month${month.number}Btn`);
    if (btn) {
      if (month.number === currentMonth) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  });
}

// Display Random Quote
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('motivationQuote').textContent = quote;
}

// Load Day Tasks
function loadDay(dayNumber) {
  appState.currentDay = dayNumber;
  const dayData = dailyTasks.find(d => d.day === dayNumber);
  const container = document.getElementById('tasksContainer');
  
  if (!dayData || !dayData.tasks) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📅</div><p>No tasks for this day</p></div>';
    return;
  }
  
  container.innerHTML = dayData.tasks.map(task => {
    const isCompleted = appState.completedTasks.includes(task.id);
    return `
      <div class="task-card ${isCompleted ? 'completed' : ''}" id="task-${task.id}">
        <div class="task-header">
          <input type="checkbox" class="task-checkbox" 
                 ${isCompleted ? 'checked' : ''} 
                 onchange="toggleTask('${task.id}', ${task.points})">
          <div class="task-content">
            <h3 class="task-title">${isCompleted ? '✓ ' : ''}${task.title}</h3>
            <div class="task-meta">
              <span class="task-badge badge-${task.category.toLowerCase()}">${task.category}</span>
              <span class="task-badge" style="background: var(--color-bg-2);">⏱️ ${task.duration}</span>
              <span class="task-badge" style="background: var(--color-bg-3);">🎯 ${task.points} pts</span>
            </div>
            <p class="task-description">${task.description}</p>
            <button class="toggle-details-btn" onclick="toggleDetails('${task.id}')">
              View Details
            </button>
            <div class="task-details hidden" id="details-${task.id}">
              <div class="task-section">
                <div class="task-section-title">📋 Pre-Task Checklist</div>
                <div class="task-section-content">${task.preTask}</div>
              </div>
              <div class="task-section">
                <div class="task-section-title">✅ Post-Task Checklist</div>
                <div class="task-section-content">${task.postTask}</div>
              </div>
              <div class="task-section">
                <div class="task-section-title">🔗 Resources</div>
                <div class="task-resources">
                  <a href="${task.resources}" target="_blank" class="resource-link">${task.resources}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  updateAllDisplays();
}

// Toggle Task Details
function toggleDetails(taskId) {
  const details = document.getElementById(`details-${taskId}`);
  details.classList.toggle('hidden');
}

// Toggle Task Completion
function toggleTask(taskId, points) {
  const taskCard = document.getElementById(`task-${taskId}`);
  const checkbox = taskCard.querySelector('.task-checkbox');
  
  if (checkbox.checked) {
    // Mark as complete
    if (!appState.completedTasks.includes(taskId)) {
      appState.completedTasks.push(taskId);
      appState.totalPoints += points;
      appState.todayPoints += points;
      appState.taskPointsMap[taskId] = points;
      
      taskCard.classList.add('completed');
      showFloatingPoints(points);
      
      // Check if day is complete
      checkDayCompletion();
      
      // Check achievements
      checkAchievements();
      
      updateAllDisplays();
    }
  } else {
    // Mark as incomplete
    const index = appState.completedTasks.indexOf(taskId);
    if (index > -1) {
      appState.completedTasks.splice(index, 1);
      const taskPoints = appState.taskPointsMap[taskId] || points;
      appState.totalPoints -= taskPoints;
      appState.todayPoints -= taskPoints;
      delete appState.taskPointsMap[taskId];
      
      taskCard.classList.remove('completed');
      updateAllDisplays();
    }
  }
}

// Show Floating Points Animation
function showFloatingPoints(points) {
  const floatingDiv = document.createElement('div');
  floatingDiv.className = 'floating-points';
  floatingDiv.textContent = `+${points}`;
  floatingDiv.style.left = `${window.innerWidth / 2}px`;
  floatingDiv.style.top = `${window.innerHeight / 2}px`;
  document.body.appendChild(floatingDiv);
  
  setTimeout(() => floatingDiv.remove(), 1000);
}

// Check Day Completion
function checkDayCompletion() {
  const dayData = dailyTasks.find(d => d.day === appState.currentDay);
  if (!dayData) return;
  
  const dayTaskIds = dayData.tasks.map(t => t.id);
  const allComplete = dayTaskIds.every(id => appState.completedTasks.includes(id));
  
  if (allComplete && !appState.completedDays.includes(appState.currentDay)) {
    appState.completedDays.push(appState.currentDay);
    
    // Update streak
    if (appState.currentDay === appState.lastCompletedDay + 1) {
      appState.streak++;
    } else if (appState.currentDay !== appState.lastCompletedDay) {
      appState.streak = 1;
    }
    
    appState.lastCompletedDay = appState.currentDay;
    if (appState.streak > appState.longestStreak) {
      appState.longestStreak = appState.streak;
    }
    
    // Check for milestones
    const milestone = milestones.find(m => m.day === appState.currentDay);
    if (milestone) {
      appState.totalPoints += milestone.bonus;
      showModal('🎉', 'Milestone Achieved!', `${milestone.name}\n\nBonus: +${milestone.bonus} points!`);
    }
  }
}

// Check Achievements
function checkAchievements() {
  achievements.forEach(achievement => {
    if (appState.achievements.includes(achievement.id)) return;
    
    let unlocked = false;
    
    if (achievement.type === 'day') {
      unlocked = appState.completedDays.includes(achievement.target);
    } else if (achievement.type === 'streak') {
      unlocked = appState.streak >= achievement.target;
    } else if (achievement.type === 'category') {
      const categoryCount = appState.completedTasks.filter(taskId => {
        for (let dayData of dailyTasks) {
          const task = dayData.tasks.find(t => t.id === taskId);
          if (task && task.category === achievement.category) return true;
        }
        return false;
      }).length;
      unlocked = categoryCount >= achievement.target;
    }
    
    if (unlocked) {
      appState.achievements.push(achievement.id);
      showModal(achievement.icon, 'Achievement Unlocked!', `${achievement.name}\n\n${achievement.description}`);
      renderAchievements();
    }
  });
}

// Render Achievements
function renderAchievements() {
  const grid = document.getElementById('achievementsGrid');
  grid.innerHTML = achievements.map(achievement => {
    const unlocked = appState.achievements.includes(achievement.id);
    return `
      <div class="achievement-badge ${unlocked ? 'unlocked' : ''}">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    `;
  }).join('');
}

// Render Milestones
function renderMilestones() {
  const container = document.getElementById('milestonesContainer');
  container.innerHTML = milestones.map(milestone => {
    const progress = Math.min((appState.completedDays.length / milestone.day) * 100, 100);
    const achieved = appState.completedDays.includes(milestone.day);
    return `
      <div class="milestone-card">
        <div class="milestone-name">${achieved ? '✓ ' : ''}${milestone.name}</div>
        <div class="milestone-info">
          <span>Day ${milestone.day}</span>
          <span>+${milestone.bonus} pts</span>
        </div>
        <div class="milestone-progress">
          <div class="milestone-progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Update All Displays
function updateAllDisplays() {
  // Current Day
  document.getElementById('currentDayDisplay').textContent = appState.currentDay;
  document.getElementById('dayInput').value = appState.currentDay;
  
  // Points
  document.getElementById('totalPointsDisplay').textContent = appState.totalPoints.toLocaleString();
  document.getElementById('pointsBoardTotal').textContent = appState.totalPoints.toLocaleString();
  document.getElementById('todayPoints').textContent = appState.todayPoints;
  
  // Streak
  document.getElementById('streakDisplay').textContent = `${appState.streak} 🔥`;
  
  // Completed Tasks
  const totalTasks = dailyTasks.reduce((sum, day) => sum + day.tasks.length, 0);
  document.getElementById('completedTasksDisplay').textContent = `${appState.completedTasks.length} / ${totalTasks}`;
  
  // Progress Bar
  const progressPercent = (appState.completedDays.length / 180) * 100;
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = `${progressPercent}%`;
  progressFill.textContent = `${Math.round(progressPercent)}%`;
  
  // Update navigation buttons
  document.getElementById('prevDayBtn').disabled = appState.currentDay <= 1;
  document.getElementById('nextDayBtn').disabled = appState.currentDay >= 180;
  
  updateMonthNavHighlight();
}

// Navigation Functions
function changeDay(delta) {
  const newDay = appState.currentDay + delta;
  if (newDay >= 1 && newDay <= 180) {
    appState.todayPoints = 0;
    loadDay(newDay);
  }
}

function jumpToDay() {
  const input = document.getElementById('dayInput');
  let day = parseInt(input.value);
  if (day >= 1 && day <= 180) {
    appState.todayPoints = 0;
    loadDay(day);
  } else {
    input.value = appState.currentDay;
  }
}

function jumpToMonth(monthNumber) {
  const startDay = (monthNumber - 1) * 30 + 1;
  appState.todayPoints = 0;
  loadDay(startDay);
}

// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('visible');
}

// Modal Functions
function showModal(icon, title, message) {
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('achievementModal').classList.add('active');
}

function closeModal() {
  document.getElementById('achievementModal').classList.remove('active');
}

function showConfirmModal(message, callback) {
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmModal').classList.add('active');
  confirmCallback = callback;
}

function closeConfirmModal() {
  document.getElementById('confirmModal').classList.remove('active');
  confirmCallback = null;
}

function confirmAction() {
  if (confirmCallback) {
    confirmCallback();
  }
  closeConfirmModal();
}

// Data Management
function exportProgress() {
  const dataStr = JSON.stringify(appState, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sre-journey-progress-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importProgress() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          appState = { ...appState, ...data };
          loadDay(appState.currentDay);
          renderAchievements();
          renderMilestones();
          updateAllDisplays();
          showModal('✅', 'Success', 'Progress imported successfully!');
        } catch (error) {
          showModal('❌', 'Error', 'Failed to import progress. Invalid file format.');
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

function resetProgress() {
  showConfirmModal('Are you sure you want to reset all progress? This cannot be undone.', () => {
    appState = {
      currentDay: 1,
      completedTasks: [],
      totalPoints: 0,
      todayPoints: 0,
      weekPoints: 0,
      monthPoints: 0,
      streak: 0,
      longestStreak: 0,
      achievements: [],
      lastCompletedDay: 0,
      completedDays: [],
      taskPointsMap: {}
    };
    loadDay(1);
    renderAchievements();
    renderMilestones();
    updateAllDisplays();
    displayRandomQuote();
    showModal('🔄', 'Reset Complete', 'Your progress has been reset. Time to start fresh!');
  });
}

// Toggle Resource Hub
function toggleResourceHub() {
  const hub = document.getElementById('resourceHub');
  const tasksContainer = document.getElementById('tasksContainer');
  const btn = document.getElementById('resourceHubBtn');
  
  if (hub.classList.contains('hidden')) {
    hub.classList.remove('hidden');
    tasksContainer.classList.add('hidden');
    btn.textContent = '← Back to Tasks';
  } else {
    hub.classList.add('hidden');
    tasksContainer.classList.remove('hidden');
    btn.textContent = '📚 Resource Hub';
  }
}

// Initialize on load
init();
