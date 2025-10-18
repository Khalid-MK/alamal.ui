<template>
	<div :dir="direction" class="button-showcase">
		<!-- Page Header -->
		<div class="showcase-header">
			<div class="max-w-7xl mx-auto px-6 py-12">
				<h1 class="text-5xl font-bold mb-4">{{ $t("ButtonShowcase") || "Button Component Showcase" }}</h1>
				<p class="text-xl text-gray-600 mb-8">
					Comprehensive demonstration of all button variants, sizes, and states
				</p>

				<!-- Theme & Locale Controls -->
				<div class="controls-section">
					<ButtonGroup gap="medium" wrap>
						<div class="control-group">
							<label class="control-label">{{ $t("Theme") || "Theme" }}:</label>
							<select v-model="selectedTheme" @change="handleThemeChange" class="control-select">
								<option value="default">Default</option>
								<option value="green">Green</option>
								<option value="red">Red</option>
								<option value="dark">Dark</option>
							</select>
						</div>

						<div class="control-group">
							<label class="control-label">{{ $t("Language") || "Language" }}:</label>
							<select v-model="selectedLocale" @change="handleLocaleChange" class="control-select">
								<option value="en">English (LTR)</option>
								<option value="ar">العربية (RTL)</option>
								<option value="ru">Русский (LTR)</option>
							</select>
						</div>

						<div class="control-group">
							<label class="control-label">{{ $t("ShowCode") || "Show Code" }}:</label>
							<input type="checkbox" v-model="showCode" class="control-checkbox" />
						</div>
					</ButtonGroup>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="max-w-7xl mx-auto px-6 py-8">
			<!-- Section 1: Size Variations -->
			<ShowcaseSection
				id="sizes"
				:title="$t('SizeVariations') || 'Size Variations'"
				:description="$t('SizeVariationsDesc') || 'Buttons in different sizes: small, medium, default, and large'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('Small') || 'Small'" :show-code="showCode" code='<EduButton size="small">Small Button</EduButton>'>
						<EduButton size="small">{{ $t("SmallButton") || "Small Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Medium') || 'Medium'" :show-code="showCode" code='<EduButton size="medium">Medium Button</EduButton>'>
						<EduButton size="medium">{{ $t("MediumButton") || "Medium Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Default') || 'Default'" :show-code="showCode" code='<EduButton>Default Button</EduButton>'>
						<EduButton>{{ $t("DefaultButton") || "Default Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Large') || 'Large'" :show-code="showCode" code='<EduButton size="large">Large Button</EduButton>'>
						<EduButton size="large">{{ $t("LargeButton") || "Large Button" }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 2: Variant Styles -->
			<ShowcaseSection
				id="variants"
				:title="$t('VariantStyles') || 'Variant Styles'"
				:description="$t('VariantStylesDesc') || 'Different visual styles for various use cases'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('Primary') || 'Primary'" :show-code="showCode" code='<EduButton variant="primary">Primary Button</EduButton>'>
						<EduButton variant="primary">{{ $t("PrimaryButton") || "Primary Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Secondary') || 'Secondary'" :show-code="showCode" code='<EduButton variant="secondary">Secondary Button</EduButton>'>
						<EduButton variant="secondary">{{ $t("SecondaryButton") || "Secondary Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Border') || 'Border'" :show-code="showCode" code='<EduButton variant="border">Border Button</EduButton>'>
						<EduButton variant="border">{{ $t("BorderButton") || "Border Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Gradient') || 'Gradient'" :show-code="showCode" code='<EduButton variant="gradient">Gradient Button</EduButton>'>
						<EduButton variant="gradient">{{ $t("GradientButton") || "Gradient Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Round') || 'Round'" :show-code="showCode" code='<EduButton variant="round">Round Button</EduButton>'>
						<EduButton variant="round">{{ $t("RoundButton") || "Round Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Transparent') || 'Transparent'" :show-code="showCode" code='<EduButton variant="transparent">Transparent Button</EduButton>'>
						<EduButton variant="transparent">{{ $t("TransparentButton") || "Transparent Button" }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 3: Curved Variants -->
			<ShowcaseSection
				id="curved"
				:title="$t('CurvedVariants') || 'Curved Variants'"
				:description="$t('CurvedVariantsDesc') || 'Buttons with morphing border-radius on hover'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('Curved') || 'Curved'" :show-code="showCode" code='<EduButton variant="curved">Curved Button</EduButton>'>
						<EduButton variant="curved">{{ $t("CurvedButton") || "Curved Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('BorderCurved') || 'Border Curved'" :show-code="showCode" code='<EduButton variant="borderCurved">Border Curved</EduButton>'>
						<EduButton variant="borderCurved">{{ $t("BorderCurvedButton") || "Border Curved" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('CurvedMedium') || 'Curved Medium'" :show-code="showCode" code='<EduButton curved="medium">Curved Medium</EduButton>'>
						<EduButton curved="medium">{{ $t("CurvedMediumButton") || "Curved Medium" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('FullyRounded') || 'Fully Rounded'" :show-code="showCode" code='<EduButton rounded>Fully Rounded</EduButton>'>
						<EduButton rounded>{{ $t("FullyRoundedButton") || "Fully Rounded" }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 4: Icon Positioning -->
			<ShowcaseSection
				id="icons"
				:title="$t('IconPositioning') || 'Icon Positioning'"
				:description="$t('IconPositioningDesc') || 'Buttons with icons in different positions'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('IconRight') || 'Icon Right (Default)'" :show-code="showCode" code='<EduButton icon="icon-4">Icon Right</EduButton>'>
						<EduButton icon="icon-4">{{ $t("IconRight") || "Icon Right" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('IconLeft') || 'Icon Left'" :show-code="showCode" code='<EduButton icon="icon-4" left-icon>Icon Left</EduButton>'>
						<EduButton icon="icon-4" left-icon>{{ $t("IconLeft") || "Icon Left" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('NoIcon') || 'No Icon'" :show-code="showCode" code='<EduButton>No Icon</EduButton>'>
						<EduButton>{{ $t("NoIcon") || "No Icon" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('MultipleIcons') || 'Secondary with Icon'" :show-code="showCode" code='<EduButton variant="secondary" icon="icon-4" size="small">Enroll Now</EduButton>'>
						<EduButton variant="secondary" icon="icon-4" size="small">{{ $t("EnrollNow") || "Enroll Now" }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 5: Icon-Only Buttons -->
			<ShowcaseSection
				id="icon-only"
				:title="$t('IconOnlyButtons') || 'Icon-Only Buttons'"
				:description="$t('IconOnlyButtonsDesc') || 'Special buttons designed for icons only'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('RoundIcon') || 'Round Icon'" :show-code="showCode" code='<IconButton variant="round" icon="icon-4" aria-label="Navigate" />'>
						<IconButton variant="round" icon="icon-4" aria-label="Navigate" />
					</DemoCard>

					<DemoCard :title="$t('SquareIcon') || 'Square Icon'" :show-code="showCode" code='<IconButton variant="square" icon="icon-4" aria-label="Action" />'>
						<IconButton variant="square" icon="icon-4" aria-label="Action" />
					</DemoCard>

					<DemoCard :title="$t('Wishlist') || 'Wishlist'" :show-code="showCode" code='<IconButton variant="wishlist" icon="icon-22" aria-label="Add to wishlist" />'>
						<IconButton variant="wishlist" icon="icon-22" aria-label="Add to wishlist" />
					</DemoCard>

					<DemoCard :title="$t('WishlistOutline') || 'Wishlist Outline'" :show-code="showCode" code='<IconButton variant="wishlist" outline icon="icon-22" aria-label="Add to wishlist" />'>
						<IconButton variant="wishlist" outline icon="icon-22" aria-label="Add to wishlist" />
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 6: Button States -->
			<ShowcaseSection
				id="states"
				:title="$t('ButtonStates') || 'Button States'"
				:description="$t('ButtonStatesDesc') || 'Different interactive states'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('Normal') || 'Normal'" :show-code="showCode" code='<EduButton>Normal State</EduButton>'>
						<EduButton>{{ $t("NormalState") || "Normal State" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Disabled') || 'Disabled'" :show-code="showCode" code='<EduButton disabled>Disabled State</EduButton>'>
						<EduButton disabled>{{ $t("DisabledState") || "Disabled State" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('Loading') || 'Loading'" :show-code="showCode" code='<EduButton loading>Loading State</EduButton>'>
						<EduButton loading>{{ $t("LoadingState") || "Loading State" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('LoadingWithText') || 'Loading with Text'" :show-code="showCode" code='<EduButton loading icon="icon-4">Processing...</EduButton>'>
						<EduButton loading icon="icon-4">{{ $t("Processing") || "Processing..." }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 7: Button Groups -->
			<ShowcaseSection
				id="groups"
				:title="$t('ButtonGroups') || 'Button Groups'"
				:description="$t('ButtonGroupsDesc') || 'Multiple buttons organized together'"
			>
				<div class="demo-grid-full">
					<DemoCard :title="$t('HorizontalGroup') || 'Horizontal Group'" :show-code="showCode" code='<ButtonGroup><EduButton>Primary</EduButton><EduButton variant="border">Secondary</EduButton></ButtonGroup>'>
						<ButtonGroup>
							<EduButton>{{ $t("Primary") || "Primary" }}</EduButton>
							<EduButton variant="border">{{ $t("Secondary") || "Secondary" }}</EduButton>
						</ButtonGroup>
					</DemoCard>

					<DemoCard :title="$t('VerticalGroup') || 'Vertical Group'" :show-code="showCode" code='<ButtonGroup direction="vertical">...</ButtonGroup>'>
						<ButtonGroup direction="vertical">
							<EduButton>{{ $t("Option1") || "Option 1" }}</EduButton>
							<EduButton variant="secondary">{{ $t("Option2") || "Option 2" }}</EduButton>
							<EduButton variant="border">{{ $t("Option3") || "Option 3" }}</EduButton>
						</ButtonGroup>
					</DemoCard>

					<DemoCard :title="$t('CenteredGroup') || 'Centered Group'" :show-code="showCode" code='<ButtonGroup justify="center">...</ButtonGroup>'>
						<ButtonGroup justify="center">
							<EduButton size="small">{{ $t("Small") || "Small" }}</EduButton>
							<EduButton>{{ $t("Default") || "Default" }}</EduButton>
							<EduButton size="large">{{ $t("Large") || "Large" }}</EduButton>
						</ButtonGroup>
					</DemoCard>

					<DemoCard :title="$t('MixedGroup') || 'Mixed Group'" :show-code="showCode" code='<ButtonGroup gap="large">...</ButtonGroup>'>
						<ButtonGroup gap="large">
							<EduButton variant="gradient" icon="icon-4">{{ $t("GetStarted") || "Get Started" }}</EduButton>
							<EduButton variant="transparent">{{ $t("LearnMore") || "Learn More" }}</EduButton>
							<IconButton variant="round" icon="icon-4" aria-label="Help" />
						</ButtonGroup>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 8: Size + Variant Combinations -->
			<ShowcaseSection
				id="combinations"
				:title="$t('Combinations') || 'Size + Variant Combinations'"
				:description="$t('CombinationsDesc') || 'Common combinations used in real applications'"
			>
				<div class="demo-grid">
					<DemoCard :title="$t('SmallSecondary') || 'Small Secondary'" :show-code="showCode" code='<EduButton variant="secondary" size="small" icon="icon-4">Enrolled</EduButton>'>
						<EduButton variant="secondary" size="small" icon="icon-4">{{ $t("Enrolled") || "Enrolled" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('MediumBorder') || 'Medium Border'" :show-code="showCode" code='<EduButton variant="border" size="medium">Try for Free</EduButton>'>
						<EduButton variant="border" size="medium">{{ $t("TryForFree") || "Try for Free" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('LargeGradient') || 'Large Gradient'" :show-code="showCode" code='<EduButton variant="gradient" size="large" icon="icon-4">View All Courses</EduButton>'>
						<EduButton variant="gradient" size="large" icon="icon-4">{{ $t("ViewAllCourses") || "View All Courses" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('SmallCurved') || 'Small Curved'" :show-code="showCode" code='<EduButton variant="curved" size="small">Enroll</EduButton>'>
						<EduButton variant="curved" size="small">{{ $t("Enroll") || "Enroll" }}</EduButton>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 9: Real-World Examples -->
			<ShowcaseSection
				id="real-world"
				:title="$t('RealWorldExamples') || 'Real-World Examples'"
				:description="$t('RealWorldExamplesDesc') || 'Buttons as they appear in actual UI contexts'"
			>
				<div class="demo-grid-full">
					<!-- Hero Section CTA -->
					<DemoCard :title="$t('HeroCTA') || 'Hero Section CTA'" :show-code="showCode">
						<div class="example-context hero-context">
							<h2>{{ $t("LearnQuranOnline") || "Learn Quran Online" }}</h2>
							<p>{{ $t("JoinThousands") || "Join thousands of students learning Quran, Arabic, and Tajweed" }}</p>
							<ButtonGroup gap="medium">
								<EduButton variant="gradient" size="large" icon="icon-4">{{ $t("StartLearning") || "Start Learning" }}</EduButton>
								<EduButton variant="transparent">{{ $t("WatchVideo") || "Watch Video" }}</EduButton>
							</ButtonGroup>
						</div>
					</DemoCard>

					<!-- Course Card -->
					<DemoCard :title="$t('CourseCard') || 'Course Card'" :show-code="showCode">
						<div class="example-context card-context">
							<div class="card-header">
								<IconButton variant="wishlist" icon="icon-22" aria-label="Add to wishlist" />
							</div>
							<h3>{{ $t("QuranRecitation") || "Quran Recitation" }}</h3>
							<p class="price">$99</p>
							<ButtonGroup gap="small" block>
								<EduButton size="small" icon="icon-4">{{ $t("EnrollNow") || "Enroll Now" }}</EduButton>
								<IconButton variant="round" icon="icon-4" aria-label="View details" />
							</ButtonGroup>
						</div>
					</DemoCard>

					<!-- Newsletter Form -->
					<DemoCard :title="$t('NewsletterForm') || 'Newsletter Form'" :show-code="showCode">
						<div class="example-context form-context">
							<h3>{{ $t("Subscribe") || "Subscribe to Our Newsletter" }}</h3>
							<div class="newsletter-form">
								<input type="email" :placeholder="$t('YourEmail') || 'Your email...'" class="newsletter-input" />
								<EduButton size="medium" icon="icon-4">{{ $t("Subscribe") || "Subscribe" }}</EduButton>
							</div>
						</div>
					</DemoCard>

					<!-- Navigation Header -->
					<DemoCard :title="$t('HeaderButtons') || 'Header Buttons'" :show-code="showCode">
						<div class="example-context header-context">
							<div class="header-actions">
								<EduButton variant="border" size="medium">{{ $t("SignIn") || "Sign In" }}</EduButton>
								<EduButton size="medium" icon="icon-4">{{ $t("GetStarted") || "Get Started" }}</EduButton>
							</div>
						</div>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 10: Full Width & Block -->
			<ShowcaseSection
				id="block"
				:title="$t('FullWidthButtons') || 'Full-Width Buttons'"
				:description="$t('FullWidthButtonsDesc') || 'Buttons that span the full container width'"
			>
				<div class="demo-grid-full">
					<DemoCard :title="$t('BlockPrimary') || 'Block Primary'" :show-code="showCode" code='<EduButton block>Full Width Button</EduButton>'>
						<EduButton block>{{ $t("FullWidthButton") || "Full Width Button" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('BlockWithIcon') || 'Block with Icon'" :show-code="showCode" code='<EduButton block icon="icon-4">Complete Registration</EduButton>'>
						<EduButton block icon="icon-4">{{ $t("CompleteRegistration") || "Complete Registration" }}</EduButton>
					</DemoCard>

					<DemoCard :title="$t('BlockGroup') || 'Block Group'" :show-code="showCode" code='<ButtonGroup block gap="medium">...</ButtonGroup>'>
						<ButtonGroup block gap="medium">
							<EduButton>{{ $t("Save") || "Save" }}</EduButton>
							<EduButton variant="border">{{ $t("Cancel") || "Cancel" }}</EduButton>
						</ButtonGroup>
					</DemoCard>
				</div>
			</ShowcaseSection>

			<!-- Section 11: Interactive Demo -->
			<ShowcaseSection
				id="interactive"
				:title="$t('InteractiveBuilder') || 'Interactive Button Builder'"
				:description="$t('InteractiveBuilderDesc') || 'Customize your button and see the result'"
			>
				<div class="interactive-builder">
					<div class="builder-controls">
						<div class="control-row">
							<label>{{ $t("Variant") || "Variant" }}:</label>
							<select v-model="builderVariant" class="builder-select">
								<option value="primary">Primary</option>
								<option value="secondary">Secondary</option>
								<option value="border">Border</option>
								<option value="curved">Curved</option>
								<option value="gradient">Gradient</option>
								<option value="round">Round</option>
								<option value="transparent">Transparent</option>
							</select>
						</div>

						<div class="control-row">
							<label>{{ $t("Size") || "Size" }}:</label>
							<select v-model="builderSize" class="builder-select">
								<option value="small">Small</option>
								<option value="medium">Medium</option>
								<option value="default">Default</option>
								<option value="large">Large</option>
							</select>
						</div>

						<div class="control-row">
							<label>{{ $t("Icon") || "Icon" }}:</label>
							<select v-model="builderIcon" class="builder-select">
								<option value="">No Icon</option>
								<option value="icon-4">icon-4</option>
								<option value="icon-22">icon-22</option>
							</select>
						</div>

						<div class="control-row">
							<label>{{ $t("IconPosition") || "Icon Position" }}:</label>
							<select v-model="builderIconPosition" class="builder-select">
								<option value="right">Right</option>
								<option value="left">Left</option>
							</select>
						</div>

						<div class="control-row">
							<label>{{ $t("State") || "State" }}:</label>
							<div class="checkbox-group">
								<label><input type="checkbox" v-model="builderDisabled" /> Disabled</label>
								<label><input type="checkbox" v-model="builderLoading" /> Loading</label>
								<label><input type="checkbox" v-model="builderBlock" /> Block</label>
								<label><input type="checkbox" v-model="builderRounded" /> Rounded</label>
							</div>
						</div>
					</div>

					<div class="builder-preview">
						<h4>{{ $t("Preview") || "Preview" }}:</h4>
						<EduButton
							:variant="builderVariant as any"
							:size="builderSize as any"
							:icon="builderIcon"
							:left-icon="builderIconPosition === 'left'"
							:disabled="builderDisabled"
							:loading="builderLoading"
							:block="builderBlock"
							:rounded="builderRounded"
						>
							{{ $t("CustomButton") || "Custom Button" }}
						</EduButton>

						<div class="builder-code">
							<h5>{{ $t("Code") || "Code" }}:</h5>
							<pre><code>{{ generatedCode }}</code></pre>
						</div>
					</div>
				</div>
			</ShowcaseSection>
		</div>

		<!-- Quick Navigation -->
		<div class="quick-nav">
			<nav>
				<a href="#sizes">{{ $t("Sizes") || "Sizes" }}</a>
				<a href="#variants">{{ $t("Variants") || "Variants" }}</a>
				<a href="#curved">{{ $t("Curved") || "Curved" }}</a>
				<a href="#icons">{{ $t("Icons") || "Icons" }}</a>
				<a href="#icon-only">{{ $t("IconOnly") || "Icon Only" }}</a>
				<a href="#states">{{ $t("States") || "States" }}</a>
				<a href="#groups">{{ $t("Groups") || "Groups" }}</a>
				<a href="#combinations">{{ $t("Combinations") || "Combinations" }}</a>
				<a href="#real-world">{{ $t("RealWorld") || "Real World" }}</a>
				<a href="#block">{{ $t("FullWidth") || "Full Width" }}</a>
				<a href="#interactive">{{ $t("Interactive") || "Interactive" }}</a>
			</nav>
		</div>
	</div>
</template>

<script setup lang="ts">
// Import components explicitly
import EduButton from '~/components/common/EduButton.vue';
import IconButton from '~/components/common/IconButton.vue';
import ButtonGroup from '~/components/common/ButtonGroup.vue';
import ShowcaseSection from '~/components/common/ShowcaseSection.vue';
import DemoCard from '~/components/common/DemoCard.vue';

// Get locale and theme
const { locale, setLocale, localeProperties } = useI18n();
const { theme, setTheme } = useTheme();

// Direction
const direction = computed(() => localeProperties.value.dir);

// Controls state
const selectedTheme = ref(theme.value || "default");
const selectedLocale = ref(locale.value || "en");
const showCode = ref(false);

// Interactive builder state
const builderVariant = ref("primary");
const builderSize = ref("default");
const builderIcon = ref("icon-4");
const builderIconPosition = ref("right");
const builderDisabled = ref(false);
const builderLoading = ref(false);
const builderBlock = ref(false);
const builderRounded = ref(false);

// Generated code for builder
const generatedCode = computed(() => {
	let code = "<EduButton";
	if (builderVariant.value !== "primary") code += ` variant="${builderVariant.value}"`;
	if (builderSize.value !== "default") code += ` size="${builderSize.value}"`;
	if (builderIcon.value) code += ` icon="${builderIcon.value}"`;
	if (builderIconPosition.value === "left") code += " left-icon";
	if (builderDisabled.value) code += " disabled";
	if (builderLoading.value) code += " loading";
	if (builderBlock.value) code += " block";
	if (builderRounded.value) code += " rounded";
	code += ">\n  Custom Button\n</EduButton>";
	return code;
});

// Handlers
const handleThemeChange = () => {
	setTheme(selectedTheme.value);
};

const handleLocaleChange = () => {
	setLocale(selectedLocale.value);
};

// Page meta
useHead({
	title: "Button Component Showcase - Al-Amal UI",
	meta: [
		{
			name: "description",
			content: "Comprehensive showcase of all button components and variants",
		},
	],
});
</script>

<style lang="scss" scoped>
.button-showcase {
	min-height: 100vh;
	background: var(--color-bg-body, #ffffff);
}

/* Header */
.showcase-header {
	background: linear-gradient(135deg, var(--color-primary, #1ab69d) 0%, #139a83 100%);
	color: white;
}

.controls-section {
	background: rgba(255, 255, 255, 0.1);
	padding: 20px;
	border-radius: 10px;
	backdrop-filter: blur(10px);
}

.control-group {
	display: flex;
	align-items: center;
	gap: 10px;
}

.control-label {
	font-weight: 500;
	color: white;
}

.control-select,
.builder-select {
	padding: 8px 12px;
	border-radius: 5px;
	border: 1px solid rgba(255, 255, 255, 0.3);
	background: rgba(255, 255, 255, 0.9);
	color: var(--color-heading, #181818);
	font-size: 14px;
	cursor: pointer;
}

.control-checkbox {
	width: 20px;
	height: 20px;
	cursor: pointer;
}

/* Sections */
.demo-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 24px;
	margin-top: 24px;
}

.demo-grid-full {
	display: grid;
	grid-template-columns: 1fr;
	gap: 24px;
	margin-top: 24px;
}

@media (min-width: 768px) {
	.demo-grid-full {
		grid-template-columns: repeat(2, 1fr);
	}
}

/* Example Contexts */
.example-context {
	padding: 24px;
	border-radius: 10px;
	background: var(--bg-color, #EAF0F2);
}

.hero-context {
	text-align: center;

	h2 {
		font-size: 32px;
		font-weight: bold;
		margin-bottom: 12px;
		color: var(--color-heading, #181818);
	}

	p {
		font-size: 16px;
		color: var(--color-body, #808080);
		margin-bottom: 24px;
	}
}

.card-context {
	background: white;
	border-radius: 10px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	.card-header {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 12px;
	}

	h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 8px;
		color: var(--color-heading, #181818);
	}

	.price {
		font-size: 24px;
		font-weight: bold;
		color: var(--color-primary, #1ab69d);
		margin-bottom: 16px;
	}
}

.form-context {
	h3 {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 16px;
		color: var(--color-heading, #181818);
	}

	.newsletter-form {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}

	.newsletter-input {
		flex: 1;
		min-width: 200px;
		padding: 12px 16px;
		border: 1px solid var(--color-border, #e5e5e5);
		border-radius: 5px;
		font-size: 15px;
	}
}

.header-context {
	background: var(--color-heading, #181818);
	padding: 16px 24px;
	border-radius: 10px;

	.header-actions {
		display: flex;
		gap: 16px;
		justify-content: flex-end;
	}
}

/* Interactive Builder */
.interactive-builder {
	display: grid;
	grid-template-columns: 1fr;
	gap: 32px;
	margin-top: 24px;
	padding: 24px;
	background: var(--bg-color, #EAF0F2);
	border-radius: 10px;
}

@media (min-width: 768px) {
	.interactive-builder {
		grid-template-columns: 1fr 1fr;
	}
}

.builder-controls {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.control-row {
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		font-weight: 500;
		color: var(--color-heading, #181818);
	}
}

.checkbox-group {
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: normal;
	}

	input[type="checkbox"] {
		width: 18px;
		height: 18px;
	}
}

.builder-preview {
	display: flex;
	flex-direction: column;
	gap: 24px;

	h4 {
		font-size: 18px;
		font-weight: 600;
		color: var(--color-heading, #181818);
	}
}

.builder-code {
	h5 {
		font-size: 16px;
		font-weight: 600;
		margin-bottom: 8px;
		color: var(--color-heading, #181818);
	}

	pre {
		background: var(--color-heading, #181818);
		color: #fff;
		padding: 16px;
		border-radius: 8px;
		overflow-x: auto;
		font-size: 14px;
		line-height: 1.6;
	}
}

/* Quick Navigation */
.quick-nav {
	position: fixed;
	right: 24px;
	top: 50%;
	transform: translateY(-50%);
	z-index: 100;

	nav {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: white;
		padding: 16px;
		border-radius: 10px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	a {
		font-size: 14px;
		color: var(--color-heading, #181818);
		text-decoration: none;
		transition: 0.3s;
		padding: 4px 8px;
		border-radius: 4px;

		&:hover {
			color: var(--color-primary, #1ab69d);
			background: var(--bg-color, #EAF0F2);
		}
	}

	@media (max-width: 1024px) {
		display: none;
	}
}

[dir="rtl"] .quick-nav {
	left: 24px;
	right: auto;
}

/* Dark Mode */
.dark-mode {
	.button-showcase {
		background: var(--dark-bg-color, #020b17);
	}

	.example-context {
		background: var(--dark-color-bg-body, #111822);
	}

	.card-context {
		background: var(--dark-color-bg-body, #111822);
	}

	.interactive-builder {
		background: var(--dark-color-bg-body, #111822);
	}

	.quick-nav nav {
		background: var(--dark-color-bg-body, #111822);
		border: 1px solid var(--dark-color-border, #282f3a);
	}

	.control-select,
	.builder-select,
	.newsletter-input {
		background: var(--dark-color-bg-body, #111822);
		color: var(--dark-color-heading, #ffffff);
		border-color: var(--dark-color-border, #282f3a);
	}
}
</style>
