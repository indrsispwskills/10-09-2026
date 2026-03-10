/**
 * Custom Product Template - JavaScript
 * Handles variant selection, gallery, AJAX cart, animations, and interactive elements
 */

(function() {
  'use strict';

  // ============================================
  // INITIALIZATION
  // ============================================

  document.addEventListener('DOMContentLoaded', function() {
    initializeProductData();
    initializeEventListeners();
    initializeAnimations();
    initializeScrollToTop();
  });

  // ============================================
  // PRODUCT DATA
  // ============================================

  let productData = null;
  let currentVariantId = null;
  let currentPurchaseType = 'sub';
  let currentQuantity = 1;
  let htcCurrentStep = 0;
  let htcPlaying = false;
  let htcAutoplayTimer = null;

  function initializeProductData() {
    const productJsonEl = document.getElementById('product-json');
    if (productJsonEl) {
      try {
        productData = JSON.parse(productJsonEl.textContent);
        currentVariantId = productData.selected_or_first_available_variant.id;
      } catch (e) {
        console.error('Error parsing product JSON:', e);
      }
    }
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  function initializeEventListeners() {
    // Purchase type toggle
    const purchaseOptions = document.querySelectorAll('.pt-option');
    purchaseOptions.forEach(option => {
      option.addEventListener('click', function() {
        setPurchaseType(this.dataset.purchaseType);
      });
    });

    // Quantity selection
    const qtyCards = document.querySelectorAll('.qty-card');
    qtyCards.forEach(card => {
      card.addEventListener('click', function() {
        setQty(this);
      });
    });

    // Gallery thumbnails
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', function() {
        const imageSrc = this.dataset.imageSrc;
        if (imageSrc) {
          swapImg(this, imageSrc);
        }
      });
    });

    // Variant options (radio buttons)
    const variantInputs = document.querySelectorAll('input[name^="options["]');
    variantInputs.forEach(input => {
      input.addEventListener('change', function() {
        handleVariantChange();
      });
    });

    // Product form submission
    const productForm = document.getElementById('product-form');
    if (productForm) {
      productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addToCart();
      });
    }

    // FAQ items
    const faqQuestions = document.querySelectorAll('.faq-q');
    faqQuestions.forEach(q => {
      q.addEventListener('click', function() {
        toggleFaq(this);
      });
    });

    // How to replace timeline
    const htcSteps = document.querySelectorAll('.htc-tl-step');
    htcSteps.forEach(step => {
      step.addEventListener('click', function() {
        const stepNum = parseInt(this.dataset.step);
        goToStep(stepNum);
      });
    });

    // How to replace controls
    const htcControls = document.querySelectorAll('.htc-ctrl');
    htcControls.forEach(ctrl => {
      ctrl.addEventListener('click', function(e) {
        e.preventDefault();
        const action = this.dataset.action;
        if (action === 'prev') prevStep();
        else if (action === 'next') nextStep();
        else if (action === 'togglePlay') togglePlay();
      });
    });

    // Decline section animation on scroll
    const declineVis = document.getElementById('declineVis');
    if (declineVis) {
      observeElement(declineVis, function() {
        animateDeclineBars();
      });
    }
  }

  // ============================================
  // PURCHASE TYPE
  // ============================================

  function setPurchaseType(type) {
    currentPurchaseType = type;

    // Update UI
    const options = document.querySelectorAll('.pt-option');
    options.forEach(opt => {
      opt.classList.remove('active');
      if (opt.dataset.purchaseType === type) {
        opt.classList.add('active');
      }
    });

    // Update price display
    updatePriceDisplay();
  }

  // ============================================
  // QUANTITY SELECTION
  // ============================================

  function setQty(element) {
    const qty = parseInt(element.dataset.qty);
    currentQuantity = qty;

    // Update UI
    const cards = document.querySelectorAll('.qty-card');
    cards.forEach(card => {
      card.classList.remove('active');
    });
    element.classList.add('active');

    // Update form
    const qtyInput = document.getElementById('quantity-input');
    if (qtyInput) {
      qtyInput.value = qty;
    }

    // Update price
    updatePriceDisplay();
  }

  // ============================================
  // GALLERY
  // ============================================

  function swapImg(element, imageSrc) {
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
      mainImg.src = imageSrc;
      mainImg.style.opacity = '0.5';
      setTimeout(() => {
        mainImg.style.opacity = '1';
      }, 100);
    }

    // Update thumbnail active state
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach(thumb => {
      thumb.classList.remove('active');
    });
    if (element) {
      element.classList.add('active');
    }
  }

  // ============================================
  // VARIANT HANDLING
  // ============================================

  function handleVariantChange() {
    if (!productData) return;

    // Get selected options
    const selectedOptions = {};
    const optionInputs = document.querySelectorAll('input[name^="options["]');
    optionInputs.forEach(input => {
      if (input.checked) {
        const optionName = input.name.match(/options\[(.*?)\]/)[1];
        selectedOptions[optionName] = input.value;
      }
    });

    // Find matching variant
    const variant = productData.variants.find(v => {
      return productData.options.every((option, index) => {
        return v.options[index] === selectedOptions[option];
      });
    });

    if (variant) {
      currentVariantId = variant.id;

      // Update variant ID input
      const variantIdInput = document.getElementById('variant-id-input');
      if (variantIdInput) {
        variantIdInput.value = variant.id;
      }

      // Update price
      updatePriceDisplay();

      // Update gallery if variant has featured image
      if (variant.featured_image) {
        const mainImg = document.getElementById('mainImg');
        if (mainImg) {
          mainImg.src = variant.featured_image.src;
        }
      }
    }
  }

  // ============================================
  // PRICE DISPLAY
  // ============================================

  function updatePriceDisplay() {
    if (!productData) return;

    const variant = productData.variants.find(v => v.id === currentVariantId);
    if (!variant) return;

    const priceElement = document.getElementById('priceTotal');
    const priceOrigElement = document.getElementById('priceOrig');
    const priceSaveElement = document.getElementById('priceSave');
    const priceNoteElement = document.getElementById('priceNote');

    if (!priceElement) return;

    // Calculate base price
    let basePrice = variant.price / 100;
    let totalPrice = basePrice * currentQuantity;

    // Apply purchase type discount
    let discount = 0;
    if (currentPurchaseType === 'sub') {
      discount = totalPrice * 0.15; // 15% off for subscription
    }

    const finalPrice = totalPrice - discount;

    // Format prices
    const formattedFinal = formatPrice(finalPrice);
    const formattedBase = formatPrice(totalPrice);

    priceElement.textContent = formattedFinal;

    if (discount > 0) {
      priceOrigElement.textContent = formattedBase;
      priceSaveElement.textContent = 'SAVE ' + Math.round(discount);
      priceSaveElement.style.display = 'inline-block';

      if (priceNoteElement) {
        priceNoteElement.textContent = 'You save ' + formatPrice(discount) + ' with subscription';
      }
    } else {
      priceOrigElement.textContent = '';
      priceSaveElement.style.display = 'none';
      if (priceNoteElement) {
        priceNoteElement.textContent = '';
      }
    }
  }

  function formatPrice(price) {
    return '$' + price.toFixed(2);
  }

  // ============================================
  // AJAX CART
  // ============================================

  function addToCart() {
    const ctaBtn = document.getElementById('ctaBtn');
    if (!ctaBtn) return;

    window.DawnCartLoading?.setButtonLoading(ctaBtn, true, 'Adding...');
    let hasError = false;

    const form = document.getElementById('product-form');
    const formData = new FormData(form);
    const cartDrawer = document.querySelector('cart-drawer');

    formData.set('id', currentVariantId);
    formData.set('quantity', currentQuantity);

    if (cartDrawer && typeof cartDrawer.getSectionsToRender === 'function') {
      formData.append(
        'sections',
        cartDrawer.getSectionsToRender().map((section) => section.id)
      );
      formData.append('sections_url', window.location.pathname);
      cartDrawer.setActiveElement(ctaBtn);
    }

    const config = fetchConfig('javascript');
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    delete config.headers['Content-Type'];
    config.body = formData;

    fetch(`${routes.cart_add_url}`, config)
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          throw new Error(response.description || 'Unable to add item to cart.');
        }

        if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
          cartDrawer.renderContents(response);
          return;
        }

        return fetch('/?sections=cart-drawer,cart-icon-bubble')
          .then((res) => res.json())
          .then((sections) => {
            const parsedResponse = { sections };
            document.querySelector('cart-drawer')?.renderContents(parsedResponse);
          });
      })
      .catch((error) => {
        hasError = true;
        console.error('Error adding to cart:', error);
        ctaBtn.disabled = false;
        ctaBtn.setAttribute('aria-busy', 'false');
        const label = ctaBtn.querySelector('.dawn-cart-loading__label');
        if (label) label.textContent = 'Error - Try Again';

        setTimeout(() => {
          window.DawnCartLoading?.setButtonLoading(ctaBtn, false);
        }, 1500);
      })
      .finally(() => {
        if (!hasError) window.DawnCartLoading?.setButtonLoading(ctaBtn, false);
      });
  }

  // ============================================
  // FAQ TOGGLE
  // ============================================

  function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;

    faqItem.classList.toggle('open');
  }

  // ============================================
  // HOW TO REPLACE (HTC) TIMELINE
  // ============================================

  function goToStep(stepNum) {
    htcCurrentStep = stepNum;

    // Update images
    const imgWraps = document.querySelectorAll('.htc-img-wrap');
    imgWraps.forEach((wrap, index) => {
      wrap.classList.remove('active');
      if (index === stepNum) {
        wrap.classList.add('active');
      }
    });

    // Update content
    const stepContents = document.querySelectorAll('.htc-step-content');
    stepContents.forEach((content, index) => {
      content.classList.remove('active');
      if (index === stepNum) {
        content.classList.add('active');
      }
    });

    // Update timeline
    const tlSteps = document.querySelectorAll('.htc-tl-step');
    tlSteps.forEach((step, index) => {
      step.classList.remove('active');
      if (index === stepNum) {
        step.classList.add('active');
      }
    });

    // Update progress fill
    updateHtcProgress();

    // Reset autoplay
    if (htcPlaying) {
      clearTimeout(htcAutoplayTimer);
      startHtcAutoplay();
    }
  }

  function prevStep() {
    let newStep = htcCurrentStep - 1;
    if (newStep < 0) newStep = 2;
    goToStep(newStep);
  }

  function nextStep() {
    let newStep = htcCurrentStep + 1;
    if (newStep > 2) newStep = 0;
    goToStep(newStep);
  }

  function togglePlay() {
    const playBtn = document.getElementById('htcPlay');
    if (!playBtn) return;

    if (htcPlaying) {
      htcPlaying = false;
      playBtn.classList.remove('playing');
      clearTimeout(htcAutoplayTimer);
    } else {
      htcPlaying = true;
      playBtn.classList.add('playing');
      startHtcAutoplay();
    }
  }

  function startHtcAutoplay() {
    htcAutoplayTimer = setTimeout(() => {
      nextStep();
      if (htcPlaying) {
        startHtcAutoplay();
      }
    }, 3000);
  }

  function updateHtcProgress() {
    const fillPercentage = ((htcCurrentStep + 1) / 3) * 100;

    // Update progress bar
    const tlFill = document.getElementById('htcFill');
    if (tlFill) {
      tlFill.style.width = fillPercentage + '%';
    }

    // Update ring progress
    const ringProgress = document.querySelector('.htc-ring-progress');
    if (ringProgress) {
      const circumference = 2 * Math.PI * 18;
      const offset = circumference - (fillPercentage / 100) * circumference;
      ringProgress.style.strokeDasharray = offset + ', ' + circumference;
    }

    // Update timeline progress circles
    const tlSteps = document.querySelectorAll('.htc-tl-step');
    tlSteps.forEach((step, index) => {
      const progress = step.querySelector('.htc-tl-progress');
      if (progress) {
        if (index < htcCurrentStep) {
          progress.style.strokeDasharray = '113, 113';
        } else if (index === htcCurrentStep) {
          progress.style.strokeDasharray = '113, 113';
        } else {
          progress.style.strokeDasharray = '0, 113';
        }
      }
    });
  }

  // ============================================
  // DECLINE BARS ANIMATION
  // ============================================

  function animateDeclineBars() {
    const bars = [
      { id: 'd1', width: 99 },
      { id: 'd2', width: 90 },
      { id: 'd3', width: 70 },
      { id: 'd4', width: 45 },
      { id: 'd5', width: 20 }
    ];

    bars.forEach((bar, index) => {
      const element = document.getElementById(bar.id);
      if (element) {
        setTimeout(() => {
          element.style.width = bar.width + '%';
        }, index * 150);
      }
    });
  }

  // ============================================
  // SCROLL TO TOP
  // ============================================

  function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
  }

  // ============================================
  // REVEAL ON SCROLL ANIMATIONS
  // ============================================

  function initializeAnimations() {
    const revealElements = document.querySelectorAll('.rv');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function observeElement(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    observer.observe(element);
  }

  // ============================================
  // EXPOSE FUNCTIONS TO GLOBAL SCOPE
  // (For inline onclick handlers in Liquid)
  // ============================================

  window.setPurchaseType = setPurchaseType;
  window.setQty = setQty;
  window.swapImg = swapImg;
  window.toggleFaq = toggleFaq;
  window.goToStep = goToStep;
  window.prevStep = prevStep;
  window.nextStep = nextStep;
  window.togglePlay = togglePlay;
  window.addToCart = addToCart;

})();
