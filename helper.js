// Helper functions for Resources Game Tools

// Level counter functionality
function initLevelCounter() {
    $('.btn-count').click(function(e) {
        e.preventDefault();
        const type = $(this).data('type');
        const field = $(this).data('field');
        const max = $(this).data('max');
        const input = $('[name="' + field + '"]');
        let value = parseInt(input.val()) || 0;

        if (type === 'plus' && (!max || value < max)) {
            input.val(value + 1);
        } else if (type === 'minus' && value > 0) {
            input.val(value - 1);
        }

        // Trigger change event for calculations
        input.trigger('change');
    });
}

// Calculator functionality
class GameCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initLevelCounter();
    }

    bindEvents() {
        $(document).on('change input', '.form-control', () => {
            this.calculate();
        });

        $(document).on('submit', 'form', (e) => {
            e.preventDefault();
            this.calculate();
        });
    }

    calculate() {
        // Override in individual calculators
        console.log('Calculate called');
    }

    formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }

    formatCurrency(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }
}

// Attack Calculator
class AttackCalculator extends GameCalculator {
    calculate() {
        const defLevel = parseInt($('[name="def_level"]').val()) || 0;
        const atkLevel = parseInt($('[name="atk_level"]').val()) || 0;
        
        // Simplified calculation (actual game would have more complex formulas)
        const defPoints = defLevel * 270;
        const atkPoints = atkLevel * 202.16;
        const diff = atkPoints - defPoints;
        const diffPercent = (diff / defPoints * 100).toFixed(2);

        $('#def-points').text(this.formatNumber(defPoints));
        $('#atk-points').text(this.formatNumber(atkPoints));
        $('#diff-points').text(this.formatNumber(diff));
        $('#diff-percent').text(diffPercent + '%');
    }
}

// Factory Improvement Calculator
class FactoryCalculator extends GameCalculator {
    calculate() {
        let totalCost = 0;
        $('.factory-level').each(function() {
            const level = parseInt($(this).val()) || 0;
            totalCost += level * 1000000; // Simplified cost calculation
        });
        $('#total-cost').text(this.formatCurrency(totalCost));
    }
}

// Mine Yield Calculator
class MineYieldCalculator extends GameCalculator {
    calculate() {
        let totalYield = 0;
        $('.res-percent').each(function() {
            const percent = parseFloat($(this).val()) || 0;
            totalYield += percent;
        });
        $('#total-yield').text(this.formatNumber(totalYield));
    }
}

// Initialize when DOM is ready
$(document).ready(function() {
    // Detect current page and initialize appropriate calculator
    const path = window.location.pathname;
    
    if (path.includes('attack-calculator')) {
        new AttackCalculator();
    } else if (path.includes('factory-improvement')) {
        new FactoryCalculator();
    } else if (path.includes('yield-of-the-mines')) {
        new MineYieldCalculator();
    } else {
        // Generic calculator for other pages
        new GameCalculator();
    }
});