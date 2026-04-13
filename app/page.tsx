< !DOCTYPE html >
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>InvoTrack — Invoice & Expense Tracker</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>
        :root {
          --bg: #F7F6F2;
        --surface: #FFFFFF;
        --surface2: #F0EFE9;
        --border: #E2E0D8;
        --border2: #CBC9BE;
        --text: #1A1916;
        --text2: #6B6860;
        --text3: #A09E98;
        --blue: #1B4FD8;
        --blue-bg: #EEF2FD;
        --blue-text: #1B4FD8;
        --green: #1A6B3C;
        --green-bg: #E8F5EE;
        --amber: #92560A;
        --amber-bg: #FEF3E2;
        --red: #A8241C;
        --red-bg: #FDECEA;
        --purple: #5B3DB8;
        --purple-bg: #F0ECFD;
        --radius: 10px;
        --radius-lg: 14px;
        --shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04);
        --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  }
        * {box - sizing: border-box; margin: 0; padding: 0; }
        body {font - family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); font-size: 14px; line-height: 1.5; }

        /* Layout */
        .app {display: flex; height: 100vh; overflow: hidden; }
        .sidebar {width: 220px; background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
        .main {flex: 1; overflow-y: auto; }

        /* Sidebar */
        .sidebar-logo {padding: 24px 20px 20px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border); }
        .logo-icon {width: 30px; height: 30px; background: var(--blue); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .logo-icon svg {width: 16px; height: 16px; fill: none; stroke: #fff; stroke-width: 2; }
        .logo-text {font - size: 16px; font-weight: 600; letter-spacing: -0.3px; }
        .logo-text span {color: var(--blue); }

        .sidebar-nav {padding: 12px 10px; flex: 1; }
        .nav-section {font - size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); padding: 8px 10px 4px; margin-top: 8px; }
        .nav-item {display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius); cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 400; transition: all 0.12s; margin-bottom: 1px; }
        .nav-item:hover {background: var(--surface2); color: var(--text); }
        .nav-item.active {background: var(--blue-bg); color: var(--blue); font-weight: 500; }
        .nav-item svg {width: 15px; height: 15px; flex-shrink: 0; }

        .sidebar-bottom {padding: 16px; border-top: 1px solid var(--border); }
        .user-card {display: flex; align-items: center; gap: 10px; }
        .user-avatar {width: 32px; height: 32px; border-radius: 50%; background: var(--blue); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; }
        .user-info {flex: 1; min-width: 0; }
        .user-name {font - size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-role {font - size: 11px; color: var(--text3); }

        /* Header */
        .page-header {padding: 28px 32px 0; }
        .page-title {font - size: 22px; font-weight: 600; letter-spacing: -0.4px; margin-bottom: 2px; }
        .page-sub {font - size: 13px; color: var(--text2); }

        /* Content */
        .content {padding: 24px 32px 40px; }

        /* Pages */
        .page {display: none; }
        .page.active {display: block; }

        /* Metric cards */
        .metrics {display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 24px; }
        .metric-card {background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px 20px; box-shadow: var(--shadow); }
        .metric-label {font - size: 11.5px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text3); margin-bottom: 10px; }
        .metric-value {font - size: 26px; font-weight: 600; letter-spacing: -0.8px; color: var(--text); font-family: 'DM Mono', monospace; }
        .metric-change {font - size: 12px; margin-top: 6px; display: flex; align-items: center; gap: 4px; }
        .metric-change.up {color: var(--green); }
        .metric-change.down {color: var(--red); }
        .metric-change.neutral {color: var(--text3); }

        /* Cards */
        .card {background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow); overflow: hidden; }
        .card-head {display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; border-bottom: 1px solid var(--border); }
        .card-title {font - size: 14px; font-weight: 600; }
        .card-body {padding: 20px; }

        /* Table */
        .tbl-wrap {overflow - x: auto; }
        table {width: 100%; border-collapse: collapse; }
        thead th {padding: 10px 16px; text-align: left; font-size: 11.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text3); border-bottom: 1px solid var(--border); white-space: nowrap; }
        tbody td {padding: 13px 16px; font-size: 13.5px; border-bottom: 1px solid var(--border); color: var(--text); }
        tbody tr:last-child td {border - bottom: none; }
        tbody tr:hover {background: var(--surface2); }

        /* Badges */
        .badge {display: inline-flex; align-items: center; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 100px; white-space: nowrap; }
        .badge-paid {background: var(--green-bg); color: var(--green); }
        .badge-pending {background: var(--amber-bg); color: var(--amber); }
        .badge-overdue {background: var(--red-bg); color: var(--red); }
        .badge-draft {background: var(--surface2); color: var(--text2); }
        .badge-expense {background: var(--purple-bg); color: var(--purple); }
        .badge-info {background: var(--blue-bg); color: var(--blue-text); }

        /* Buttons */
        .btn {display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius); border: 1px solid var(--border); background: var(--surface); color: var(--text); font-size: 13px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; text-decoration: none; }
        .btn:hover {background: var(--surface2); border-color: var(--border2); }
        .btn svg {width: 14px; height: 14px; }
        .btn-primary {background: var(--blue); color: #fff; border-color: var(--blue); }
        .btn-primary:hover {background: #1641BC; border-color: #1641BC; }
        .btn-sm {padding: 5px 12px; font-size: 12px; }
        .btn-ghost {border - color: transparent; background: transparent; }
        .btn-ghost:hover {background: var(--surface2); border-color: transparent; }
        .btn-danger {background: var(--red-bg); color: var(--red); border-color: transparent; }
        .btn-danger:hover {background: #FACBC8; }

        /* Two col */
        .two-col {display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .three-col {display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }

        /* Bar chart */
        .bar-row {display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .bar-row:last-child {margin - bottom: 0; }
        .bar-name {font - size: 12.5px; color: var(--text2); width: 90px; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bar-track {flex: 1; background: var(--surface2); border-radius: 100px; height: 8px; overflow: hidden; }
        .bar-fill {height: 100%; border-radius: 100px; transition: width 0.6s ease; }
        .bar-val {font - size: 12px; font-weight: 500; color: var(--text2); width: 58px; text-align: right; font-family: 'DM Mono', monospace; }

        /* Mini stat */
        .mini-stat {display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .mini-stat:last-child {border - bottom: none; padding-bottom: 0; }
        .mini-stat-label {font - size: 13px; color: var(--text2); }
        .mini-stat-value {font - size: 14px; font-weight: 600; font-family: 'DM Mono', monospace; }

        /* Form */
        .form-grid {display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-group {display: flex; flex-direction: column; gap: 5px; }
        .form-group.full {grid - column: 1 / -1; }
        .form-label {font - size: 12px; font-weight: 500; color: var(--text2); }
        .form-input {padding: 9px 12px; border: 1px solid var(--border); border-radius: var(--radius); font-size: 13.5px; color: var(--text); background: var(--surface); font-family: 'DM Sans', sans-serif; transition: border 0.12s; outline: none; }
        .form-input:focus {border - color: var(--blue); box-shadow: 0 0 0 3px rgba(27,79,216,0.08); }
        select.form-input {cursor: pointer; }
        textarea.form-input {resize: vertical; min-height: 80px; }

        /* Invoice builder */
        .line-items {width: 100%; border-collapse: collapse; margin: 16px 0; }
        .line-items th {padding: 8px 12px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text3); border-bottom: 1px solid var(--border); }
        .line-items td {padding: 8px 12px; border-bottom: 1px solid var(--border); }
        .line-items tr:last-child td {border - bottom: none; }
        .line-input {padding: 7px 10px; border: 1px solid transparent; border-radius: 6px; font-size: 13px; color: var(--text); background: transparent; font-family: 'DM Sans', sans-serif; outline: none; width: 100%; }
        .line-input:hover, .line-input:focus {border - color: var(--border); background: var(--surface2); }
        .totals-section {border - top: 1px solid var(--border); padding-top: 16px; display: flex; justify-content: flex-end; }
        .totals-table {width: 260px; }
        .totals-row {display: flex; justify-content: space-between; padding: 5px 0; font-size: 13.5px; }
        .totals-row.grand {font - size: 16px; font-weight: 600; border-top: 1px solid var(--border); margin-top: 4px; padding-top: 10px; }
        .totals-label {color: var(--text2); }
        .totals-value {font - family: 'DM Mono', monospace; font-weight: 500; }

        /* Activity feed */
        .activity-item {display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
        .activity-item:last-child {border - bottom: none; }
        .activity-dot {width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        .activity-content {flex: 1; }
        .activity-title {font - size: 13px; font-weight: 500; margin-bottom: 2px; }
        .activity-time {font - size: 12px; color: var(--text3); }

        /* Status dot */
        .status-dot {display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; }

        /* Empty state */
        .empty {text - align: center; padding: 48px 20px; color: var(--text3); }
        .empty-icon {font - size: 36px; margin-bottom: 12px; }
        .empty-text {font - size: 14px; }

        /* Toast */
        .toast {position: fixed; bottom: 24px; right: 24px; background: var(--text); color: #fff; padding: 12px 20px; border-radius: var(--radius); font-size: 13px; font-weight: 500; box-shadow: var(--shadow-md); z-index: 100; opacity: 0; transform: translateY(8px); transition: all 0.25s; pointer-events: none; }
        .toast.show {opacity: 1; transform: translateY(0); }

        /* Modal */
        .modal-overlay {position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 50; display: none; align-items: center; justify-content: center; }
        .modal-overlay.show {display: flex; }
        .modal {background: var(--surface); border-radius: var(--radius-lg); width: 480px; max-width: calc(100vw - 32px); box-shadow: var(--shadow-md); max-height: 85vh; overflow-y: auto; }
        .modal-head {padding: 20px 24px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .modal-title {font - size: 15px; font-weight: 600; }
        .modal-body {padding: 20px 24px; }
        .modal-footer {padding: 16px 24px; border-top: 1px solid var(--border); display: flex; justify-content: flex-end; gap: 8px; }

        /* Tag row */
        .tag-row {display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

        /* Amount */
        .amount {font - family: 'DM Mono', monospace; font-size: 13.5px; }

        /* Actions */
        .action-row {display: flex; gap: 6px; }

        /* Scrollbar */
        ::-webkit-scrollbar {width: 6px; height: 6px; }
        ::-webkit-scrollbar-track {background: transparent; }
        ::-webkit-scrollbar-thumb {background: var(--border2); border-radius: 3px; }

        /* Progress ring */
        .progress-wrap {display: flex; align-items: center; gap: 16px; }
        .progress-ring-label {font - size: 22px; font-weight: 600; font-family: 'DM Mono', monospace; }

        /* Month tabs */
        .tabs {display: flex; gap: 2px; background: var(--surface2); padding: 3px; border-radius: var(--radius); }
        .tab {padding: 5px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 500; cursor: pointer; color: var(--text2); transition: all 0.12s; }
        .tab.active {background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

        /* Receipt upload */
        .upload-area {border: 1.5px dashed var(--border2); border-radius: var(--radius); padding: 24px; text-align: center; cursor: pointer; color: var(--text3); transition: all 0.12s; }
        .upload-area:hover {border - color: var(--blue); color: var(--blue); background: var(--blue-bg); }

        .divider {height: 1px; background: var(--border); margin: 20px 0; }

        .flex-row {display: flex; align-items: center; gap: 8px; }
        .flex-between {display: flex; align-items: center; justify-content: space-between; }
        .mt-4 {margin - top: 16px; }
        .mt-6 {margin - top: 24px; }
        .mb-4 {margin - bottom: 16px; }
        .gap-12 {gap: 12px; }
        .text-mono {font - family: 'DM Mono', monospace; }

        @media (max-width: 900px) {
    .metrics {grid - template - columns: repeat(2, 1fr); }
        .two-col, .three-col {grid - template - columns: 1fr; }
        .form-grid {grid - template - columns: 1fr; }
        .form-group.full {grid - column: auto; }
  }
      </style>
    </head>
    <body>

      <div class="app">
        <!-- Sidebar -->
        <aside class="sidebar">
          <div class="sidebar-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="14" rx="1.5" stroke-width="1.5" /><line x1="5" y1="6" x2="11" y2="6" stroke-width="1.5" stroke-linecap="round" /><line x1="5" y1="9" x2="9" y2="9" stroke-width="1.5" stroke-linecap="round" /></svg>
            </div>
            <span class="logo-text">Invo<span>Track</span></span>
          </div>

          <nav class="sidebar-nav">
            <div class="nav-section">Overview</div>
            <div class="nav-item active" onclick="navigate('dashboard',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" /><rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" /></svg>
              Dashboard
            </div>
            <div class="nav-section">Finance</div>
            <div class="nav-item" onclick="navigate('invoices',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="1" width="12" height="14" rx="1.5" /><line x1="5" y1="5" x2="11" y2="5" stroke-linecap="round" /><line x1="5" y1="8" x2="11" y2="8" stroke-linecap="round" /><line x1="5" y1="11" x2="8" y2="11" stroke-linecap="round" /></svg>
              Invoices
            </div>
            <div class="nav-item" onclick="navigate('expenses',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="14" height="10" rx="1.5" /><path d="M4 4V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" /><circle cx="8" cy="9" r="2" /></svg>
              Expenses
            </div>
            <div class="nav-item" onclick="navigate('clients',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" /></svg>
              Clients
            </div>
            <div class="nav-section">Actions</div>
            <div class="nav-item" onclick="navigate('new-invoice',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="7" /><line x1="8" y1="5" x2="8" y2="11" stroke-linecap="round" /><line x1="5" y1="8" x2="11" y2="8" stroke-linecap="round" /></svg>
              New Invoice
            </div>
            <div class="nav-item" onclick="openExpenseModal()">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="2" x2="8" y2="14" stroke-linecap="round" /><path d="M5 5h4.5a2.5 2.5 0 0 1 0 5H5V5z" /><path d="M5 10h5" /></svg>
              Log Expense
            </div>
            <div class="nav-section">Settings</div>
            <div class="nav-item" onclick="navigate('settings',this)">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="2.5" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" /></svg>
              Settings
            </div>
          </nav>

          <div class="sidebar-bottom">
            <div class="user-card">
              <div class="user-avatar">AK</div>
              <div class="user-info">
                <div class="user-name">Alex Khan</div>
                <div class="user-role">Admin · Pro</div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main content -->
        <main class="main">

          <!-- DASHBOARD -->
          <div class="page active" id="page-dashboard">
            <div class="page-header">
              <div class="flex-between">
                <div>
                  <div class="page-title">Dashboard</div>
                  <div class="page-sub">Welcome back, Alex. Here's your financial summary.</div>
                </div>
                <div class="flex-row mt-4" style="margin-top:0;">
                  <div class="tabs">
                    <div class="tab active">Apr</div>
                    <div class="tab">Mar</div>
                    <div class="tab">Q1</div>
                    <div class="tab">YTD</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="metrics">
                <div class="metric-card">
                  <div class="metric-label">Total Revenue</div>
                  <div class="metric-value">$24,850</div>
                  <div class="metric-change up">↑ 12% vs March</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Outstanding</div>
                  <div class="metric-value">$7,200</div>
                  <div class="metric-change neutral">3 unpaid invoices</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Total Expenses</div>
                  <div class="metric-value">$8,340</div>
                  <div class="metric-change down">↑ 4% vs March</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Net Profit</div>
                  <div class="metric-value">$16,510</div>
                  <div class="metric-change up">↑ 18% vs March</div>
                </div>
              </div>

              <div class="three-col">
                <div style="display:flex;flex-direction:column;gap:16px;">
                  <div class="card">
                    <div class="card-head">
                      <span class="card-title">Revenue by client</span>
                      <span class="badge badge-info">April 2026</span>
                    </div>
                    <div class="card-body">
                      <div class="bar-row"><span class="bar-name">Acme Corp</span><div class="bar-track"><div class="bar-fill" style="width:82%;background:var(--blue);"></div></div><span class="bar-val">$9,800</span></div>
                      <div class="bar-row"><span class="bar-name">Brightwave</span><div class="bar-track"><div class="bar-fill" style="width:60%;background:var(--blue);opacity:0.75;"></div></div><span class="bar-val">$7,200</span></div>
                      <div class="bar-row"><span class="bar-name">NovaTech</span><div class="bar-track"><div class="bar-fill" style="width:48%;background:var(--blue);opacity:0.55;"></div></div><span class="bar-val">$5,750</span></div>
                      <div class="bar-row"><span class="bar-name">Others</span><div class="bar-track"><div class="bar-fill" style="width:18%;background:var(--blue);opacity:0.35;"></div></div><span class="bar-val">$2,100</span></div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-head">
                      <span class="card-title">Recent invoices</span>
                      <button class="btn btn-sm" onclick="navigate('invoices', document.querySelector('[onclick*=invoices]'))">View all</button>
                    </div>
                    <div class="tbl-wrap">
                      <table>
                        <thead><tr><th>#</th><th>Client</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                          <tr><td class="text-mono" style="color:var(--text2);font-size:12px;">INV-041</td><td>Acme Corp</td><td class="amount">$3,200</td><td><span class="badge badge-pending">Pending</span></td></tr>
                          <tr><td class="text-mono" style="color:var(--text2);font-size:12px;">INV-040</td><td>Brightwave</td><td class="amount">$1,800</td><td><span class="badge badge-overdue">Overdue</span></td></tr>
                          <tr><td class="text-mono" style="color:var(--text2);font-size:12px;">INV-039</td><td>NovaTech</td><td class="amount">$5,750</td><td><span class="badge badge-paid">Paid</span></td></tr>
                          <tr><td class="text-mono" style="color:var(--text2);font-size:12px;">INV-038</td><td>Acme Corp</td><td class="amount">$6,600</td><td><span class="badge badge-paid">Paid</span></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div style="display:flex;flex-direction:column;gap:16px;">
                  <div class="card">
                    <div class="card-head"><span class="card-title">Expense breakdown</span></div>
                    <div class="card-body">
                      <div class="bar-row"><span class="bar-name">Salaries</span><div class="bar-track"><div class="bar-fill" style="width:72%;background:var(--purple);"></div></div><span class="bar-val">$4,800</span></div>
                      <div class="bar-row"><span class="bar-name">Software</span><div class="bar-track"><div class="bar-fill" style="width:34%;background:var(--purple);opacity:0.7;"></div></div><span class="bar-val">$1,240</span></div>
                      <div class="bar-row"><span class="bar-name">Travel</span><div class="bar-track"><div class="bar-fill" style="width:22%;background:var(--purple);opacity:0.5;"></div></div><span class="bar-val">$900</span></div>
                      <div class="bar-row"><span class="bar-name">Meals</span><div class="bar-track"><div class="bar-fill" style="width:12%;background:var(--purple);opacity:0.35;"></div></div><span class="bar-val">$400</span></div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-head"><span class="card-title">Quick stats</span></div>
                    <div class="card-body" style="padding-top:8px;">
                      <div class="mini-stat"><span class="mini-stat-label">Avg. invoice value</span><span class="mini-stat-value">$4,970</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Collection rate</span><span class="mini-stat-value" style="color:var(--green);">91%</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Overdue invoices</span><span class="mini-stat-value" style="color:var(--red);">1</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Avg. days to pay</span><span class="mini-stat-value">18 days</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Active clients</span><span class="mini-stat-value">5</span></div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-head"><span class="card-title">Activity</span></div>
                    <div class="card-body" style="padding-top:8px;padding-bottom:4px;">
                      <div class="activity-item">
                        <div class="activity-dot" style="background:var(--green);"></div>
                        <div class="activity-content"><div class="activity-title">INV-039 marked as paid</div><div class="activity-time">Today, 9:14 AM</div></div>
                      </div>
                      <div class="activity-item">
                        <div class="activity-dot" style="background:var(--blue);"></div>
                        <div class="activity-content"><div class="activity-title">INV-041 sent to Acme Corp</div><div class="activity-time">Yesterday, 4:32 PM</div></div>
                      </div>
                      <div class="activity-item">
                        <div class="activity-dot" style="background:var(--red);"></div>
                        <div class="activity-content"><div class="activity-title">INV-040 payment overdue</div><div class="activity-time">Apr 10, 2026</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- INVOICES -->
          <div class="page" id="page-invoices">
            <div class="page-header">
              <div class="flex-between">
                <div>
                  <div class="page-title">Invoices</div>
                  <div class="page-sub">Manage and track all your invoices</div>
                </div>
                <div class="flex-row" style="margin-top:0;">
                  <button class="btn" onclick="exportCSV()">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h10M8 3v7M5 7l3 3 3-3" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    Export
                  </button>
                  <button class="btn btn-primary" onclick="navigate('new-invoice', document.querySelector('[onclick*=new-invoice]'))">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="3" x2="8" y2="13" stroke-linecap="round" /><line x1="3" y1="8" x2="13" y2="8" stroke-linecap="round" /></svg>
                    New Invoice
                  </button>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="flex-row mb-4 gap-12">
                <div class="tag-row">
                  <div class="tab active" onclick="filterInvoices('all',this)">All (5)</div>
                  <div class="tab" onclick="filterInvoices('paid',this)">Paid (3)</div>
                  <div class="tab" onclick="filterInvoices('pending',this)">Pending (1)</div>
                  <div class="tab" onclick="filterInvoices('overdue',this)">Overdue (1)</div>
                </div>
                <div style="flex:1;"></div>
                <input class="form-input" id="inv-search" placeholder="Search invoices..." style="width:200px;" oninput="searchInvoices()" />
              </div>
              <div class="card">
                <div class="tbl-wrap">
                  <table id="invoice-table">
                    <thead><tr><th>Invoice #</th><th>Client</th><th>Issue Date</th><th>Due Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody id="invoice-tbody"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- EXPENSES -->
          <div class="page" id="page-expenses">
            <div class="page-header">
              <div class="flex-between">
                <div>
                  <div class="page-title">Expenses</div>
                  <div class="page-sub">Log and categorize your business expenses</div>
                </div>
                <button class="btn btn-primary" onclick="openExpenseModal()">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="3" x2="8" y2="13" stroke-linecap="round" /><line x1="3" y1="8" x2="13" y2="8" stroke-linecap="round" /></svg>
                  Add Expense
                </button>
              </div>
            </div>
            <div class="content">
              <div class="metrics" style="grid-template-columns:repeat(3,minmax(0,1fr));">
                <div class="metric-card">
                  <div class="metric-label">This Month</div>
                  <div class="metric-value" id="exp-total">$8,340</div>
                  <div class="metric-change down">↑ 4% vs March</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Largest Category</div>
                  <div class="metric-value" style="font-size:18px;">Salaries</div>
                  <div class="metric-change neutral">$4,800 · 58%</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Transactions</div>
                  <div class="metric-value" id="exp-count">5</div>
                  <div class="metric-change neutral">this month</div>
                </div>
              </div>
              <div class="card">
                <div class="card-head">
                  <span class="card-title">All expenses</span>
                  <input class="form-input" id="exp-search" placeholder="Search..." style="width:180px;" oninput="searchExpenses()" />
                </div>
                <div class="tbl-wrap">
                  <table>
                    <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Vendor</th><th>Amount</th><th>Actions</th></tr></thead>
                    <tbody id="expense-tbody"></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- CLIENTS -->
          <div class="page" id="page-clients">
            <div class="page-header">
              <div class="flex-between">
                <div>
                  <div class="page-title">Clients</div>
                  <div class="page-sub">Manage your client relationships</div>
                </div>
                <button class="btn btn-primary" onclick="openClientModal()">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="8" y1="3" x2="8" y2="13" stroke-linecap="round" /><line x1="3" y1="8" x2="13" y2="8" stroke-linecap="round" /></svg>
                  Add Client
                </button>
              </div>
            </div>
            <div class="content">
              <div class="card">
                <div class="tbl-wrap">
                  <table>
                    <thead><tr><th>Client</th><th>Email</th><th>Phone</th><th>Total Billed</th><th>Outstanding</th><th>Invoices</th></tr></thead>
                    <tbody>
                      <tr>
                        <td><div class="flex-row"><div class="user-avatar" style="width:28px;height:28px;font-size:10px;background:#1B4FD8;">AC</div>Acme Corp</div></td>
                        <td style="color:var(--text2);">billing@acme.com</td>
                        <td style="color:var(--text2);">+1 415-555-0100</td>
                        <td class="amount">$16,400</td>
                        <td class="amount" style="color:var(--amber);">$3,200</td>
                        <td><span class="badge badge-info">3 invoices</span></td>
                      </tr>
                      <tr>
                        <td><div class="flex-row"><div class="user-avatar" style="width:28px;height:28px;font-size:10px;background:#5B3DB8;">BW</div>Brightwave</div></td>
                        <td style="color:var(--text2);">finance@brightwave.io</td>
                        <td style="color:var(--text2);">+1 650-555-0220</td>
                        <td class="amount">$7,200</td>
                        <td class="amount" style="color:var(--red);">$1,800</td>
                        <td><span class="badge badge-info">1 invoice</span></td>
                      </tr>
                      <tr>
                        <td><div class="flex-row"><div class="user-avatar" style="width:28px;height:28px;font-size:10px;background:#1A6B3C;">NT</div>NovaTech</div></td>
                        <td style="color:var(--text2);">ap@novatech.co</td>
                        <td style="color:var(--text2);">+1 310-555-0890</td>
                        <td class="amount">$5,750</td>
                        <td class="amount" style="color:var(--green);">$0</td>
                        <td><span class="badge badge-info">1 invoice</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- NEW INVOICE -->
          <div class="page" id="page-new-invoice">
            <div class="page-header">
              <div class="flex-between">
                <div>
                  <div class="page-title">Create Invoice</div>
                  <div class="page-sub">Fill in the details to generate a new invoice</div>
                </div>
                <div class="flex-row">
                  <button class="btn" onclick="saveDraft()">Save Draft</button>
                  <button class="btn btn-primary" onclick="sendInvoice()">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2L9 7M14 2H9M14 2V7" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 4H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3" stroke-linecap="round" /></svg>
                    Send Invoice
                  </button>
                </div>
              </div>
            </div>
            <div class="content">
              <div class="two-col">
                <div style="display:flex;flex-direction:column;gap:16px;">
                  <div class="card">
                    <div class="card-head"><span class="card-title">Client details</span></div>
                    <div class="card-body">
                      <div class="form-grid">
                        <div class="form-group full">
                          <label class="form-label">Client</label>
                          <select class="form-input" id="inv-client" onchange="updateClientEmail()">
                            <option value="">— Select client —</option>
                            <option value="Acme Corp">Acme Corp</option>
                            <option value="Brightwave">Brightwave</option>
                            <option value="NovaTech">NovaTech</option>
                            <option value="new">+ Add new client</option>
                          </select>
                        </div>
                        <div class="form-group full">
                          <label class="form-label">Billing email</label>
                          <input class="form-input" id="inv-email" type="email" placeholder="client@company.com" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Invoice date</label>
                          <input class="form-input" type="date" id="inv-date" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Due date</label>
                          <input class="form-input" type="date" id="inv-due" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Invoice #</label>
                          <input class="form-input" id="inv-num" value="INV-042" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Currency</label>
                          <select class="form-input">
                            <option>USD — US Dollar</option>
                            <option>EUR — Euro</option>
                            <option>GBP — British Pound</option>
                            <option>PKR — Pakistani Rupee</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card">
                    <div class="card-head"><span class="card-title">Notes</span></div>
                    <div class="card-body">
                      <textarea class="form-input" placeholder="Payment terms, thank you message, bank details..." style="min-height:100px;width:100%;"></textarea>
                    </div>
                  </div>
                </div>

                <div class="card" style="height:fit-content;">
                  <div class="card-head">
                    <span class="card-title">Line items</span>
                    <button class="btn btn-sm" onclick="addLineItem()">+ Add item</button>
                  </div>
                  <div class="card-body" style="padding-top:0;padding-bottom:12px;">
                    <table class="line-items">
                      <thead><tr><th style="width:40%;">Description</th><th>Qty</th><th>Rate</th><th>Total</th><th></th></tr></thead>
                      <tbody id="line-items-body">
                        <tr data-row="0">
                          <td><input class="line-input" placeholder="Service or product" oninput="calcTotals()" /></td>
                          <td><input class="line-input" type="number" value="1" style="width:50px;" oninput="calcTotals()" /></td>
                          <td><input class="line-input" type="number" placeholder="0.00" style="width:80px;" oninput="calcTotals()" /></td>
                          <td class="amount" id="row-total-0">—</td>
                          <td><button class="btn btn-ghost btn-sm" onclick="removeRow(this)" style="padding:4px 6px;color:var(--text3);">✕</button></td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="totals-section">
                      <div class="totals-table">
                        <div class="totals-row"><span class="totals-label">Subtotal</span><span class="totals-value" id="subtotal">$0.00</span></div>
                        <div class="totals-row">
                          <span class="totals-label">Tax</span>
                          <span style="display:flex;align-items:center;gap:6px;">
                            <select class="form-input" id="tax-rate" onchange="calcTotals()" style="padding:3px 6px;font-size:12px;width:70px;">
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="10" selected>10%</option>
                              <option value="15">15%</option>
                              <option value="20">20%</option>
                            </select>
                            <span class="totals-value" id="tax-amount">$0.00</span>
                          </span>
                        </div>
                        <div class="totals-row grand"><span>Total</span><span class="totals-value" id="grand-total">$0.00</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SETTINGS -->
          <div class="page" id="page-settings">
            <div class="page-header">
              <div class="page-title">Settings</div>
              <div class="page-sub">Manage your account and preferences</div>
            </div>
            <div class="content">
              <div class="two-col">
                <div style="display:flex;flex-direction:column;gap:16px;">
                  <div class="card">
                    <div class="card-head"><span class="card-title">Business profile</span></div>
                    <div class="card-body">
                      <div class="form-grid">
                        <div class="form-group full">
                          <label class="form-label">Business name</label>
                          <input class="form-input" value="Alex Khan Consulting" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Email</label>
                          <input class="form-input" value="alex@khancons.com" />
                        </div>
                        <div class="form-group">
                          <label class="form-label">Phone</label>
                          <input class="form-input" value="+92 300 1234567" />
                        </div>
                        <div class="form-group full">
                          <label class="form-label">Address</label>
                          <textarea class="form-input" style="min-height:60px;">Multan, Punjab, Pakistan</textarea>
                        </div>
                      </div>
                      <div class="mt-4">
                        <button class="btn btn-primary" onclick="showToast('Profile saved!')">Save changes</button>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-head"><span class="card-title">Invoice defaults</span></div>
                    <div class="card-body">
                      <div class="form-grid">
                        <div class="form-group">
                          <label class="form-label">Default currency</label>
                          <select class="form-input"><option>USD</option><option>EUR</option><option>PKR</option></select>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Default tax rate</label>
                          <select class="form-input"><option>10%</option><option>0%</option><option>5%</option><option>15%</option></select>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Payment terms</label>
                          <select class="form-input"><option>Net 30</option><option>Net 15</option><option>Due on receipt</option></select>
                        </div>
                        <div class="form-group">
                          <label class="form-label">Invoice prefix</label>
                          <input class="form-input" value="INV-" />
                        </div>
                      </div>
                      <div class="mt-4"><button class="btn btn-primary" onclick="showToast('Defaults saved!')">Save defaults</button></div>
                    </div>
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;gap:16px;">
                  <div class="card">
                    <div class="card-head"><span class="card-title">Plan & billing</span></div>
                    <div class="card-body">
                      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                        <div style="background:var(--blue-bg);padding:12px 16px;border-radius:var(--radius);flex:1;">
                          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:var(--blue-text);margin-bottom:4px;">Current Plan</div>
                          <div style="font-size:20px;font-weight:600;color:var(--blue-text);">Pro</div>
                          <div style="font-size:12px;color:var(--blue-text);opacity:0.7;">$29 / month</div>
                        </div>
                      </div>
                      <div class="mini-stat"><span class="mini-stat-label">Invoices this month</span><span class="mini-stat-value">5 / unlimited</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Clients</span><span class="mini-stat-value">3 / unlimited</span></div>
                      <div class="mini-stat"><span class="mini-stat-label">Next billing</span><span class="mini-stat-value">May 12, 2026</span></div>
                      <div class="mt-4"><button class="btn btn-danger">Cancel subscription</button></div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-head"><span class="card-title">Notifications</span></div>
                    <div class="card-body">
                      <div class="mini-stat">
                        <span class="mini-stat-label">Invoice paid alerts</span>
                        <label style="position:relative;display:inline-block;width:38px;height:20px;cursor:pointer;">
                          <input type="checkbox" checked style="opacity:0;width:0;height:0;" onchange="this.parentNode.querySelector('span').style.background=this.checked?'var(--blue)':'var(--border2)'">
                            <span style="position:absolute;inset:0;background:var(--blue);border-radius:10px;transition:0.2s;"></span>
                            <span style="position:absolute;top:3px;left:3px;width:14px;height:14px;background:#fff;border-radius:50%;transition:0.2s;transform:translateX(18px);"></span>
                        </label>
                      </div>
                      <div class="mini-stat">
                        <span class="mini-stat-label">Overdue reminders</span>
                        <label style="position:relative;display:inline-block;width:38px;height:20px;cursor:pointer;">
                          <input type="checkbox" checked style="opacity:0;width:0;height:0;" onchange="this.parentNode.querySelector('span').style.background=this.checked?'var(--blue)':'var(--border2)'">
                            <span style="position:absolute;inset:0;background:var(--blue);border-radius:10px;transition:0.2s;"></span>
                            <span style="position:absolute;top:3px;left:3px;width:14px;height:14px;background:#fff;border-radius:50%;transition:0.2s;transform:translateX(18px);"></span>
                        </label>
                      </div>
                      <div class="mini-stat">
                        <span class="mini-stat-label">Weekly summaries</span>
                        <label style="position:relative;display:inline-block;width:38px;height:20px;cursor:pointer;">
                          <input type="checkbox" style="opacity:0;width:0;height:0;" onchange="this.parentNode.querySelector('span').style.background=this.checked?'var(--blue)':'var(--border2)'">
                            <span style="position:absolute;inset:0;background:var(--border2);border-radius:10px;transition:0.2s;"></span>
                            <span style="position:absolute;top:3px;left:3px;width:14px;height:14px;background:#fff;border-radius:50%;transition:0.2s;"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      <!-- Expense Modal -->
      <div class="modal-overlay" id="expense-modal">
        <div class="modal">
          <div class="modal-head">
            <span class="modal-title">Log Expense</span>
            <button class="btn btn-ghost btn-sm" onclick="closeModal('expense-modal')" style="padding:4px 8px;">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Date</label>
                <input class="form-input" type="date" id="exp-date" />
              </div>
              <div class="form-group">
                <label class="form-label">Amount</label>
                <input class="form-input" type="number" id="exp-amount" placeholder="0.00" />
              </div>
              <div class="form-group full">
                <label class="form-label">Description</label>
                <input class="form-input" id="exp-desc" placeholder="e.g. AWS hosting, Team lunch..." />
              </div>
              <div class="form-group">
                <label class="form-label">Category</label>
                <select class="form-input" id="exp-cat">
                  <option>Software</option>
                  <option>Salaries</option>
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Marketing</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Vendor</label>
                <input class="form-input" id="exp-vendor" placeholder="e.g. AWS, Figma..." />
              </div>
              <div class="form-group full">
                <label class="form-label">Receipt (optional)</label>
                <div class="upload-area" onclick="showToast('File upload coming soon!')">
                  <div style="font-size:22px;margin-bottom:6px;">📎</div>
                  <div style="font-size:13px;">Click to upload receipt</div>
                  <div style="font-size:11px;margin-top:3px;">PDF, PNG, JPG up to 5MB</div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" onclick="closeModal('expense-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="saveExpense()">Save Expense</button>
          </div>
        </div>
      </div>

      <!-- Client Modal -->
      <div class="modal-overlay" id="client-modal">
        <div class="modal">
          <div class="modal-head">
            <span class="modal-title">Add Client</span>
            <button class="btn btn-ghost btn-sm" onclick="closeModal('client-modal')" style="padding:4px 8px;">✕</button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group full"><label class="form-label">Company name</label><input class="form-input" id="cl-name" placeholder="Company Inc." /></div>
              <div class="form-group"><label class="form-label">Contact name</label><input class="form-input" id="cl-contact" placeholder="Jane Smith" /></div>
              <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="cl-email" type="email" placeholder="billing@company.com" /></div>
              <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="cl-phone" placeholder="+1 555 0100" /></div>
              <div class="form-group"><label class="form-label">Country</label><input class="form-input" id="cl-country" placeholder="United States" /></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" onclick="closeModal('client-modal')">Cancel</button>
            <button class="btn btn-primary" onclick="saveClient()">Add Client</button>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div class="toast" id="toast"></div>

      <script>
// ---- Data ----
        const invoices = [
        {id:'INV-041', client:'Acme Corp', issued:'Apr 1, 2026', due:'Apr 30, 2026', amount:3200, status:'pending' },
        {id:'INV-040', client:'Brightwave', issued:'Mar 20, 2026', due:'Apr 19, 2026', amount:1800, status:'overdue' },
        {id:'INV-039', client:'NovaTech', issued:'Mar 15, 2026', due:'Apr 14, 2026', amount:5750, status:'paid' },
        {id:'INV-038', client:'Acme Corp', issued:'Mar 1, 2026', due:'Mar 31, 2026', amount:6600, status:'paid' },
        {id:'INV-037', client:'Others', issued:'Feb 20, 2026', due:'Mar 20, 2026', amount:2100, status:'paid' },
        ];
        const expenses = [
        {date:'Apr 10', desc:'Figma subscription', cat:'Software', vendor:'Figma', amount:45 },
        {date:'Apr 8', desc:'Team lunch', cat:'Meals', vendor:'Local', amount:120 },
        {date:'Apr 5', desc:'AWS hosting', cat:'Software', vendor:'Amazon Web Services', amount:310 },
        {date:'Apr 3', desc:'Flight — client visit', cat:'Travel', vendor:'Emirates', amount:430 },
        {date:'Apr 1', desc:'Staff payroll', cat:'Salaries', vendor:'Internal', amount:4800 },
        ];

        let currentFilter = 'all';
        let rowCount = 1;

        // ---- Navigation ----
        function navigate(page, el) {
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('page-' + page).classList.add('active');
        if (el) el.classList.add('active');
        if (page === 'invoices') renderInvoices(invoices);
        if (page === 'expenses') renderExpenses(expenses);
        if (page === 'new-invoice') initNewInvoice();
}

        // ---- Invoice table ----
        function statusBadge(s) {
  const map = {paid:'badge-paid', pending:'badge-pending', overdue:'badge-overdue', draft:'badge-draft' };
        return `<span class="badge ${map[s]||'badge-draft'}">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`;
}

        function renderInvoices(data) {
  const tbody = document.getElementById('invoice-tbody');
        if (!data.length) {tbody.innerHTML = '<tr><td colspan="7"><div class="empty"><div class="empty-icon">📄</div><div class="empty-text">No invoices found</div></div></td></tr>'; return; }
  tbody.innerHTML = data.map(inv => `
        <tr>
          <td class="text-mono" style="color:var(--text2);font-size:12.5px;">${inv.id}</td>
          <td><strong style="font-weight:500;">${inv.client}</strong></td>
          <td style="color:var(--text2);">${inv.issued}</td>
          <td style="color:var(--text2);">${inv.due}</td>
          <td class="amount">$${inv.amount.toLocaleString()}</td>
          <td>${statusBadge(inv.status)}</td>
          <td>
            <div class="action-row">
              ${inv.status !== 'paid' ? `<button class="btn btn-sm" onclick="markPaid('${inv.id}')">Mark paid</button>` : ''}
              <button class="btn btn-sm btn-ghost" onclick="showToast('Invoice ${inv.id} downloaded!')">PDF</button>
            </div>
          </td>
        </tr>`).join('');
}

        function filterInvoices(f, el) {
          currentFilter = f;
  document.querySelectorAll('#page-invoices .tab').forEach(t => t.classList.remove('active'));
        if (el) el.classList.add('active');
  const filtered = f === 'all' ? invoices : invoices.filter(i => i.status === f);
        renderInvoices(filtered);
}

        function searchInvoices() {
  const q = document.getElementById('inv-search').value.toLowerCase();
  const data = currentFilter === 'all' ? invoices : invoices.filter(i => i.status === currentFilter);
  renderInvoices(data.filter(i => i.client.toLowerCase().includes(q) || i.id.toLowerCase().includes(q)));
}

        function markPaid(id) {
  const inv = invoices.find(i => i.id === id);
        if (inv) {inv.status = 'paid'; renderInvoices(invoices); showToast(`${id} marked as paid!`); }
}

        function exportCSV() {
  const rows = [['Invoice #','Client','Issued','Due','Amount','Status']].concat(invoices.map(i=>[i.id,i.client,i.issued,i.due,'$'+i.amount,i.status]));
  const csv = rows.map(r=>r.join(',')).join('\n');
        const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        a.download = 'invoices.csv'; a.click();
        showToast('Invoices exported!');
}

        // ---- Expense table ----
        function renderExpenses(data) {
  const tbody = document.getElementById('expense-tbody');
        if (!data.length) {tbody.innerHTML = '<tr><td colspan="6"><div class="empty"><div class="empty-icon">💸</div><div class="empty-text">No expenses logged</div></div></td></tr>'; return; }
  tbody.innerHTML = data.map((e,i) => `
        <tr>
          <td style="color:var(--text2);">${e.date}</td>
          <td><strong style="font-weight:500;">${e.desc}</strong></td>
          <td><span class="badge badge-expense">${e.cat}</span></td>
          <td style="color:var(--text2);">${e.vendor}</td>
          <td class="amount">$${e.amount.toLocaleString()}</td>
          <td><button class="btn btn-sm btn-ghost" style="color:var(--red);" onclick="deleteExpense(${i})">Delete</button></td>
        </tr>`).join('');
  document.getElementById('exp-total').textContent = '$' + data.reduce((s,e)=>s+e.amount,0).toLocaleString();
        document.getElementById('exp-count').textContent = data.length;
}

        function searchExpenses() {
  const q = document.getElementById('exp-search').value.toLowerCase();
  renderExpenses(expenses.filter(e => e.desc.toLowerCase().includes(q) || e.cat.toLowerCase().includes(q) || e.vendor.toLowerCase().includes(q)));
}

        function deleteExpense(i) {
          expenses.splice(i, 1); renderExpenses(expenses); showToast('Expense deleted');
}

        // ---- Expense modal ----
        function openExpenseModal() {
  const today = new Date().toISOString().split('T')[0];
        document.getElementById('exp-date').value = today;
        document.getElementById('exp-amount').value = '';
        document.getElementById('exp-desc').value = '';
        document.getElementById('exp-vendor').value = '';
        document.getElementById('expense-modal').classList.add('show');
}

        function saveExpense() {
  const date = document.getElementById('exp-date').value;
        const amount = parseFloat(document.getElementById('exp-amount').value);
        const desc = document.getElementById('exp-desc').value;
        const cat = document.getElementById('exp-cat').value;
        const vendor = document.getElementById('exp-vendor').value;
        if (!desc || !amount) {showToast('Please fill in required fields'); return; }
        expenses.unshift({date: date ? new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'Today', desc, cat, vendor: vendor || '—', amount });
        renderExpenses(expenses);
        closeModal('expense-modal');
        showToast('Expense saved!');
}

        // ---- Client modal ----
        function openClientModal() {
          document.getElementById('client-modal').classList.add('show');
}
        function saveClient() {
  const name = document.getElementById('cl-name').value;
        if (!name) {showToast('Enter a client name'); return; }
        closeModal('client-modal');
        showToast(`${name} added!`);
}

        function closeModal(id) {
          document.getElementById(id).classList.remove('show');
}

        // ---- New Invoice ----
        function initNewInvoice() {
  const today = new Date().toISOString().split('T')[0];
        const due = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
        document.getElementById('inv-date').value = today;
        document.getElementById('inv-due').value = due;
        calcTotals();
}

        function updateClientEmail() {
  const map = {'Acme Corp':'billing@acme.com', 'Brightwave':'finance@brightwave.io', 'NovaTech':'ap@novatech.co' };
        const client = document.getElementById('inv-client').value;
        document.getElementById('inv-email').value = map[client] || '';
}

        function addLineItem() {
  const tbody = document.getElementById('line-items-body');
        const i = rowCount++;
        const tr = document.createElement('tr');
        tr.setAttribute('data-row', i);
        tr.innerHTML = `
        <td><input class="line-input" placeholder="Service or product" oninput="calcTotals()" /></td>
        <td><input class="line-input" type="number" value="1" style="width:50px;" oninput="calcTotals()" /></td>
        <td><input class="line-input" type="number" placeholder="0.00" style="width:80px;" oninput="calcTotals()" /></td>
        <td class="amount" id="row-total-${i}">—</td>
        <td><button class="btn btn-ghost btn-sm" onclick="removeRow(this)" style="padding:4px 6px;color:var(--text3);">✕</button></td>`;
        tbody.appendChild(tr);
}

        function removeRow(btn) {
  const tr = btn.closest('tr');
  if (document.querySelectorAll('#line-items-body tr').length > 1) {tr.remove(); calcTotals(); }
}

        function calcTotals() {
          let sub = 0;
  document.querySelectorAll('#line-items-body tr').forEach((tr,i) => {
    const inputs = tr.querySelectorAll('input[type=number]');
        const qty = parseFloat(inputs[0]?.value) || 0;
        const rate = parseFloat(inputs[1]?.value) || 0;
        const total = qty * rate;
        sub += total;
        const cell = tr.querySelector('.amount');
        if (cell) cell.textContent = total ? '$' + total.toFixed(2) : '—';
  });
        const taxRate = parseFloat(document.getElementById('tax-rate').value) / 100;
        const tax = sub * taxRate;
        document.getElementById('subtotal').textContent = '$' + sub.toFixed(2);
        document.getElementById('tax-amount').textContent = '$' + tax.toFixed(2);
        document.getElementById('grand-total').textContent = '$' + (sub + tax).toFixed(2);
}

        function sendInvoice() {
  const client = document.getElementById('inv-client').value;
        const num = document.getElementById('inv-num').value;
        if (!client) {showToast('Please select a client'); return; }
        const grand = document.getElementById('grand-total').textContent;
        if (grand === '$0.00') {showToast('Please add at least one line item'); return; }
        invoices.unshift({id: num, client, issued: 'Apr 12, 2026', due: document.getElementById('inv-due').value || 'May 12, 2026', amount: parseFloat(grand.replace('$','').replace(',','')), status: 'pending' });
        showToast(`${num} sent to ${client}!`);
        navigate('invoices', document.querySelector('[onclick*="invoices"]'));
}

        function saveDraft() {
          showToast('Invoice saved as draft');
}

        // ---- Utility ----
        function showToast(msg) {
  const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); }));

// Tabs (dashboard) — passive
document.querySelectorAll('.tabs .tab').forEach(t => t.addEventListener('click', function() {
  if (this.closest('#page-dashboard')) {
          this.closest('.tabs').querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
  }
}));

        // Init
        renderInvoices(invoices);
        renderExpenses(expenses);
        initNewInvoice();
      </script>
    </body>
  </html>