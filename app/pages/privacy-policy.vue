<template>
  <main>
    <!-- Breadcrumb -->
    <CommonPageBreadcrumb
      :title="$t('PrivacyPolicy')"
      :breadcrumbItems="breadcrumbItems"
    />

    <!-- Content Section -->
    <CommonContentWithSidebar>
      <template #content>
        <article class="prose prose-lg max-w-none privacy-policy-content">
          <!-- Introduction -->
          <div class="text-block">
            <h3 class="title">{{ $t('PrivacyPolicyIntro') }}</h3>
            <p>At Al-Amal Islamic Education Platform, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online learning platform.</p>
            <p>By accessing or using our services, you agree to the terms outlined in this Privacy Policy. If you do not agree with our practices, please do not use our platform.</p>
          </div>

          <!-- Information We Collect -->
          <div class="text-block">
            <h4 class="title">{{ $t('InformationWeCollect') }}</h4>
            <p>We collect various types of information to provide and improve our Islamic education services:</p>
            <ul class="checkmark-list">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Student profile information (age, learning level, course preferences)</li>
              <li>Payment and billing information for course enrollments</li>
              <li>Learning progress and course completion data</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Communication records with instructors and support staff</li>
            </ul>
          </div>

          <!-- How We Use Your Information -->
          <div class="text-block">
            <h4 class="title">{{ $t('HowWeUseInformation') }}</h4>
            <p>Your information is used to enhance your learning experience and provide quality Islamic education:</p>
            <ul class="checkmark-list">
              <li>To create and manage your student account</li>
              <li>To process course enrollments and payments</li>
              <li>To connect you with qualified Quran and Arabic teachers</li>
              <li>To track your learning progress and provide certificates</li>
              <li>To send course updates, prayer times, and Islamic event notifications</li>
              <li>To improve our curriculum and teaching methods</li>
              <li>To ensure platform security and prevent fraud</li>
            </ul>
          </div>

          <!-- Data Protection & Security -->
          <div class="text-block">
            <h4 class="title">{{ $t('DataProtectionSecurity') }}</h4>
            <p>We implement industry-standard security measures to protect your personal information. Our platform uses encryption, secure servers, and regular security audits to safeguard your data.</p>
            <p>However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>
          </div>

          <!-- Student Privacy & Minors -->
          <div class="text-block">
            <h4 class="title">{{ $t('StudentPrivacyMinors') }}</h4>
            <p>We take special care to protect the privacy of young learners. For students under 18 years of age:</p>
            <ul class="checkmark-list">
              <li>Parental consent is required for account creation</li>
              <li>Parents have access to monitor learning progress</li>
              <li>Limited data collection focused on educational purposes</li>
              <li>Strict policies against sharing student information</li>
              <li>Secure communication channels between students and teachers</li>
            </ul>
          </div>

          <!-- Third-Party Services -->
          <div class="text-block">
            <h4 class="title">{{ $t('ThirdPartyServices') }}</h4>
            <p>We may use trusted third-party services to enhance our platform functionality:</p>
            <ul class="checkmark-list">
              <li>Payment processors for secure transactions</li>
              <li>Email services for course communications</li>
              <li>Video conferencing tools for live classes</li>
              <li>Analytics tools to improve user experience</li>
            </ul>
            <p>These third parties are obligated to protect your information and use it only for the specified services.</p>
          </div>

          <!-- Cookies & Tracking -->
          <div class="text-block">
            <h4 class="title">{{ $t('CookiesTracking') }}</h4>
            <p>We use cookies and similar tracking technologies to enhance your browsing experience, remember your preferences, and analyze platform usage. You can control cookie settings through your browser preferences.</p>
          </div>

          <!-- Your Rights -->
          <div class="text-block">
            <h4 class="title">{{ $t('YourRights') }}</h4>
            <p>You have the following rights regarding your personal information:</p>
            <ul class="checkmark-list">
              <li>Access and review your personal data</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Download your learning records and certificates</li>
            </ul>
          </div>

          <!-- Updates to Privacy Policy -->
          <div class="text-block">
            <h4 class="title">{{ $t('PolicyUpdates') }}</h4>
            <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or platform notifications.</p>
            <p>Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
          </div>

          <!-- Contact Us -->
          <div class="text-block">
            <h4 class="title">{{ $t('ContactUs') }}</h4>
            <p>If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
            <ul class="checkmark-list">
              <li>Email: privacy@alamal-education.com</li>
              <li>Phone: +1 (XXX) XXX-XXXX</li>
              <li>Address: [Al-Amal Education Center Address]</li>
            </ul>
            <p>We are committed to resolving any privacy concerns promptly and transparently.</p>
          </div>
        </article>
      </template>

      <template #sidebar>
        <!-- Search Widget -->
        <SidebarSearchWidget />

        <!-- Tags Widget -->
        <SidebarTagsWidget />

        <!-- Categories Widget -->
        <SidebarCategoriesWidget />

        <!-- CTA Widget -->
        <SidebarCTAWidget />
      </template>
    </CommonContentWithSidebar>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO Meta Tags
useHead({
  title: 'Privacy Policy - Al-Amal Islamic Education',
  meta: [
    {
      name: 'description',
      content: 'Learn about how Al-Amal Islamic Education Platform protects your privacy and handles your personal information.'
    },
    {
      name: 'keywords',
      content: 'privacy policy, data protection, Al-Amal, Islamic education, student privacy'
    }
  ]
})

// Breadcrumb navigation
const breadcrumbItems = computed(() => [
  { label: t('Home'), path: '/' },
  { label: t('PrivacyPolicy') }
])
</script>

<style scoped>
/* Privacy Policy Content Styling */
.privacy-policy-content {
  color: var(--color-body);
  line-height: 1.73;
}

.text-block {
  margin-bottom: 3.75rem; /* 60px */
}

.text-block:last-child {
  margin-bottom: 0;
}

.text-block h3.title {
  font-size: 1.75rem; /* 28px */
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.5rem; /* 24px */
}

.text-block h4.title {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.5rem; /* 24px */
}

.text-block p {
  margin-bottom: 1.75rem; /* 28px */
  color: var(--color-body);
}

/* Custom Checkmark List */
.checkmark-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.checkmark-list li {
  position: relative;
  padding-left: 2rem; /* 32px */
  margin-top: 1rem; /* 16px */
  margin-bottom: 1rem;
  color: var(--color-body);
}

.checkmark-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.1rem;
}

/* RTL Support */
[dir="rtl"] .checkmark-list li {
  padding-left: 0;
  padding-right: 2rem;
}

[dir="rtl"] .checkmark-list li::before {
  left: auto;
  right: 0;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .text-block {
    margin-bottom: 3rem; /* 48px */
  }

  .text-block h3.title {
    font-size: 1.5rem; /* 24px */
  }

  .text-block h4.title {
    font-size: 1.125rem; /* 18px */
  }
}
</style>
