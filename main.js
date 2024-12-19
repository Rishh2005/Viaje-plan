document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Budget Trip Planner
    const planTripBtn = document.getElementById('plan-trip-btn');
    const tripPlan = document.getElementById('trip-plan');

    planTripBtn.addEventListener('click', () => {
        const budget = document.getElementById('budget').value;
        const destination = document.getElementById('destination').value;
        const duration = document.getElementById('duration').value;

        const plan = `Your ${duration}-day trip to ${destination} with a budget of $${budget}:
        
        Day 1: Arrive and check-in to budget hotel ($80)
        - Visit free local attractions
        - Dinner at local street food market ($15)

        Day 2: Walking tour of city highlights (free)
        - Visit to main museum ($20)
        - Picnic lunch in park ($10)
        - Evening cultural show ($30)

        Day 3: Day trip to nearby natural attraction ($50 including transport)
        - Packed lunch ($8)
        - Return to city, farewell dinner at mid-range restaurant ($25)

        Total estimated cost: $238 per person`;

        tripPlan.textContent = plan;
    });

    // Budget Tracker
    const addExpenseBtn = document.getElementById('add-expense-btn');
    const expenseList = document.getElementById('expense-list');
    const totalBudgetEl = document.getElementById('total-budget');
    const remainingBudgetEl = document.getElementById('remaining-budget');

    addExpenseBtn.addEventListener('click', () => {
        const expenseName = document.getElementById('expense-name').value;
        const expenseAmount = document.getElementById('expense-amount').value;

        if (expenseName && expenseAmount) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${expenseName}</span><span>$${expenseAmount}</span>`;
            expenseList.appendChild(li);

            const totalBudget = parseInt(totalBudgetEl.textContent);
            const remainingBudget = parseInt(remainingBudgetEl.textContent) - parseInt(expenseAmount);
            remainingBudgetEl.textContent = remainingBudget;

            document.getElementById('expense-name').value = '';
            document.getElementById('expense-amount').value = '';
        }
    });

    // Itinerary Planner (basic drag and drop)
    const activities = document.querySelectorAll('.activity');
    const activitiesList = document.getElementById('activities-list');

    activities.forEach(activity => {
        activity.addEventListener('dragstart', dragStart);
        activity.addEventListener('dragover', dragOver);
        activity.addEventListener('drop', drop);
        activity.setAttribute('draggable', true);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
        setTimeout(() => {
            e.target.classList.add('dragging');
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        const currentElement = e.target;
        
        if (draggingElement !== currentElement && currentElement.classList.contains('activity')) {
            const rect = currentElement.getBoundingClientRect();
            const next = (e.clientY - rect.top) / (rect.bottom - rect.top) > 0.5;
            activitiesList.insertBefore(draggingElement, next ? currentElement.nextSibling : currentElement);
        }
    }

    function drop(e) {
        e.preventDefault();
        document.querySelector('.dragging').classList.remove('dragging');
    }
});

