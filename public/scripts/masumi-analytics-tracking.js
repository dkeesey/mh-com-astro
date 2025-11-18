/**
 * Masumi Hayashi Foundation - Comprehensive Analytics Tracking
 *
 * Tracks conversions for Google Ad Grants compliance and optimization:
 * - Donation flow (button clicks → Stripe redirect → completion)
 * - Artwork engagement (time on artwork pages)
 * - Multi-page visits (serious browsing)
 * - Newsletter signups
 * - Contact form submissions
 * - Catalogue engagement
 * - Social sharing
 *
 * GA4 Property: G-PBJM0849KH
 */

// Ensure gtag is available
if (typeof gtag === 'undefined') {
  console.warn('⚠️ Google Analytics not loaded - tracking disabled');
  window.gtag = function() {};
}

// =============================================================================
// 1. DONATION TRACKING - Critical for Ad Grants ROI
// =============================================================================
function trackDonationFlow() {
  // Track all donation button clicks
  const donationButtons = document.querySelectorAll('a[href*="donate.stripe.com"], a[href*="/donate"]');

  donationButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      const isMonthly = buttonText.toLowerCase().includes('monthly') ||
                       buttonText.toLowerCase().includes('recurring');
      const href = this.href;

      // Track button click
      gtag('event', 'donation_button_click', {
        'event_category': 'donation',
        'event_label': buttonText,
        'donation_type': isMonthly ? 'monthly' : 'one-time',
        'button_location': window.location.pathname,
        'value': 1
      });

      // If going to Stripe, track as donation initiated
      if (href.includes('stripe.com')) {
        gtag('event', 'donation_initiated', {
          'event_category': 'conversion',
          'event_label': isMonthly ? 'monthly' : 'one-time',
          'donation_type': isMonthly ? 'monthly' : 'one-time',
          'currency': 'USD',
          'value': 25.0 // Estimated average donation
        });

        console.log('💰 Donation initiated:', isMonthly ? 'Monthly' : 'One-time');
      }

      console.log('✅ Donation button clicked:', buttonText);
    });
  });

  console.log(`✅ Tracking ${donationButtons.length} donation buttons`);
}

// =============================================================================
// 2. ARTWORK ENGAGEMENT - High-value user behavior
// =============================================================================
function trackArtworkEngagement() {
  const currentPath = window.location.pathname;

  // Detect if on artwork page (adjust URL pattern as needed)
  const isArtworkPage = currentPath.includes('/artwork/') ||
                        currentPath.includes('/series/') ||
                        currentPath.includes('/gallery/');

  if (!isArtworkPage) return;

  const startTime = Date.now();
  let tracked30sec = false;
  let tracked60sec = false;
  let tracked120sec = false;

  // Track engagement at 30, 60, 120 seconds
  const track30 = setTimeout(() => {
    if (!tracked30sec) {
      tracked30sec = true;
      gtag('event', 'artwork_view_engaged', {
        'event_category': 'engagement',
        'event_label': '30_seconds',
        'page_location': currentPath,
        'engagement_duration': 30,
        'value': 1
      });
      console.log('🎨 Artwork engaged: 30 seconds');
    }
  }, 30000);

  const track60 = setTimeout(() => {
    if (!tracked60sec) {
      tracked60sec = true;
      gtag('event', 'artwork_view_engaged', {
        'event_category': 'engagement',
        'event_label': '60_seconds',
        'page_location': currentPath,
        'engagement_duration': 60,
        'value': 2
      });
      console.log('🎨 Artwork engaged: 60 seconds');
    }
  }, 60000);

  const track120 = setTimeout(() => {
    if (!tracked120sec) {
      tracked120sec = true;
      gtag('event', 'artwork_view_highly_engaged', {
        'event_category': 'engagement',
        'event_label': '120_seconds',
        'page_location': currentPath,
        'engagement_duration': 120,
        'value': 3
      });
      console.log('🎨 Artwork highly engaged: 120 seconds');
    }
  }, 120000);

  // Clean up on page leave
  window.addEventListener('beforeunload', () => {
    clearTimeout(track30);
    clearTimeout(track60);
    clearTimeout(track120);
  });

  console.log('✅ Artwork engagement tracking initialized');
}

// =============================================================================
// 3. MULTI-PAGE VISIT - Serious browsing behavior
// =============================================================================
function trackMultiPageVisit() {
  // Use sessionStorage to persist across page loads
  const sessionKey = 'mh_pages_visited';
  let pagesVisited = parseInt(sessionStorage.getItem(sessionKey) || '0');

  pagesVisited++;
  sessionStorage.setItem(sessionKey, pagesVisited.toString());

  // Track milestones
  if (pagesVisited === 3) {
    gtag('event', 'multi_page_visit', {
      'event_category': 'engagement',
      'event_label': '3_pages',
      'pages_viewed': 3,
      'value': 1
    });
    console.log('📄 Multi-page visit: 3 pages');
  } else if (pagesVisited === 5) {
    gtag('event', 'multi_page_visit', {
      'event_category': 'engagement',
      'event_label': '5_pages',
      'pages_viewed': 5,
      'value': 2
    });
    console.log('📄 Multi-page visit: 5 pages');
  } else if (pagesVisited === 10) {
    gtag('event', 'multi_page_visit_deep', {
      'event_category': 'engagement',
      'event_label': '10_pages',
      'pages_viewed': 10,
      'value': 3
    });
    console.log('📄 Deep exploration: 10 pages');
  }
}

// =============================================================================
// 4. NEWSLETTER SIGNUP - Email list building
// =============================================================================
function trackNewsletterSignup() {
  const newsletterForms = document.querySelectorAll('form[action*="mailchimp"], form[id*="newsletter"], form[class*="newsletter"]');

  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const email = this.querySelector('input[type="email"]')?.value || 'unknown';

      gtag('event', 'newsletter_signup', {
        'event_category': 'conversion',
        'event_label': 'footer_signup',
        'page_location': window.location.pathname,
        'value': 5.0 // Lead value
      });

      console.log('✅ Newsletter signup:', email);
    });
  });

  // Also track generic form submissions (will catch newsletter if no specific class)
  const genericForms = document.querySelectorAll('footer form');
  genericForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const hasEmailInput = this.querySelector('input[type="email"]');
      if (hasEmailInput) {
        gtag('event', 'newsletter_signup', {
          'event_category': 'conversion',
          'event_label': 'generic_form',
          'page_location': window.location.pathname,
          'value': 5.0
        });
        console.log('✅ Newsletter signup (generic form)');
      }
    });
  });

  console.log(`✅ Tracking ${newsletterForms.length} newsletter forms`);
}

// =============================================================================
// 5. CONTACT FORM SUBMISSION - High-value inquiries
// =============================================================================
function trackContactForm() {
  const contactForms = document.querySelectorAll('form[action*="/contact"], form[id*="contact"], form[class*="contact"]');

  contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const formName = this.name || this.id || 'contact_form';

      gtag('event', 'contact_form_submit', {
        'event_category': 'conversion',
        'event_label': formName,
        'page_location': window.location.pathname,
        'value': 10.0 // Inquiry value
      });

      console.log('✅ Contact form submitted:', formName);
    });
  });

  // Track exhibition inquiry specifically
  const exhibitionForms = document.querySelectorAll('form[id*="exhibition"], form[class*="exhibition"]');
  exhibitionForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      gtag('event', 'exhibition_inquiry', {
        'event_category': 'conversion',
        'event_label': 'exhibition_contact',
        'page_location': window.location.pathname,
        'value': 20.0 // Higher value - curator interest
      });
      console.log('✅ Exhibition inquiry submitted');
    });
  });

  console.log(`✅ Tracking ${contactForms.length} contact forms`);
}

// =============================================================================
// 6. CATALOGUE ENGAGEMENT - Researcher/curator behavior
// =============================================================================
function trackCatalogueEngagement() {
  const currentPath = window.location.pathname;

  // Detect if on catalogue page
  const isCataloguePage = currentPath.includes('/catalogue') ||
                          currentPath.includes('/works') ||
                          currentPath.includes('/raisonne');

  if (!isCataloguePage) return;

  let tracked60sec = false;

  const track60 = setTimeout(() => {
    if (!tracked60sec) {
      tracked60sec = true;
      gtag('event', 'catalogue_engaged', {
        'event_category': 'engagement',
        'event_label': 'catalogue_60sec',
        'page_location': currentPath,
        'value': 2
      });
      console.log('📚 Catalogue engaged: 60 seconds');
    }
  }, 60000);

  window.addEventListener('beforeunload', () => clearTimeout(track60));

  console.log('✅ Catalogue engagement tracking initialized');
}

// =============================================================================
// 7. PDF/CATALOGUE DOWNLOADS - Already tracked by Enhanced Measurement
// =============================================================================
// Note: file_download is auto-tracked by GA4 Enhanced Measurement
// No custom code needed - just marking as conversion in GA4 admin

// =============================================================================
// 8. SOCIAL SHARING - Virality indicator
// =============================================================================
function trackSocialSharing() {
  const socialLinks = document.querySelectorAll('a[href*="facebook.com/share"], a[href*="twitter.com/intent"], a[href*="linkedin.com/share"], .share-button, [class*="social-share"]');

  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const platform = this.href.includes('facebook') ? 'facebook' :
                      this.href.includes('twitter') ? 'twitter' :
                      this.href.includes('linkedin') ? 'linkedin' : 'unknown';

      gtag('event', 'social_share', {
        'event_category': 'engagement',
        'event_label': platform,
        'page_location': window.location.pathname,
        'content_type': 'artwork',
        'value': 1
      });

      console.log('✅ Social share:', platform);
    });
  });

  console.log(`✅ Tracking ${socialLinks.length} social share buttons`);
}

// =============================================================================
// 9. OUTBOUND LINKS - Museum/gallery referrals (already tracked)
// =============================================================================
// Note: Outbound clicks are auto-tracked by GA4 Enhanced Measurement
// No custom code needed

// =============================================================================
// 10. VIDEO ENGAGEMENT - Documentary/interview content
// =============================================================================
function trackVideoEngagement() {
  // YouTube iframe tracking
  const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');

  if (youtubeIframes.length > 0) {
    // Load YouTube IFrame API
    if (typeof YT === 'undefined') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = function() {
      youtubeIframes.forEach((iframe, index) => {
        const videoId = iframe.src.match(/embed\/([^?]+)/)?.[1];
        if (!videoId) return;

        if (!iframe.id) {
          iframe.id = `youtube-player-${index}`;
        }

        const player = new YT.Player(iframe.id, {
          events: {
            'onStateChange': function(event) {
              const videoTitle = iframe.title || 'Unknown Video';

              if (event.data === YT.PlayerState.PLAYING) {
                gtag('event', 'video_start', {
                  'event_category': 'video',
                  'video_title': videoTitle,
                  'video_id': videoId,
                  'page_location': window.location.pathname
                });
                console.log('▶️ Video started:', videoTitle);
              }

              if (event.data === YT.PlayerState.ENDED) {
                gtag('event', 'video_complete', {
                  'event_category': 'video',
                  'video_title': videoTitle,
                  'video_id': videoId,
                  'page_location': window.location.pathname,
                  'value': 2
                });
                console.log('✅ Video completed:', videoTitle);
              }
            }
          }
        });
      });
    };
  }

  console.log(`✅ Tracking ${youtubeIframes.length} YouTube videos`);
}

// =============================================================================
// INITIALIZE ALL TRACKING
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Masumi Hayashi Analytics - Initializing...');
  console.log('📊 GA4 Property: G-PBJM0849KH');

  try {
    trackDonationFlow();
    trackArtworkEngagement();
    trackMultiPageVisit();
    trackNewsletterSignup();
    trackContactForm();
    trackCatalogueEngagement();
    trackSocialSharing();
    trackVideoEngagement();

    console.log('✅ Masumi Hayashi Analytics - All tracking initialized successfully');
    console.log('🎯 Tracking: Donations, Artwork Engagement, Multi-page Visits, Newsletter, Contact Forms, Catalogue, Social, Video');
  } catch (error) {
    console.error('❌ Analytics tracking error:', error);
  }
});
