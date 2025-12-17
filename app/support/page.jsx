'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Mail, MessageCircle, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: "Getting Started", 
    icon: "🚀",
    questions: [
      {
        q: "What is AjoPay?",
        a: "AjoPay is a secure platform that helps groups save together, manage contributions, and distribute funds with total transparency. It's perfect for savings circles (Ajo/Esusu), rotating savings groups, family savings, and community fundraising."
      },
      {
        q: "How do I create an account?",
        a: "Download the AjoPay app from the App Store or Google Play Store, then sign up using your email address or phone number. You can also use Apple Sign-In for quick registration. Verify your email or phone to activate your account."
      },
      {
        q: "Is AjoPay free to use?",
        a: "Creating an account and joining groups is completely free. We charge a small processing fee (3%) when you fund your wallet to cover payment processing costs. All fees are transparently displayed before you confirm any transaction."
      },
      {
        q: "What countries is AjoPay available in?",
        a: "AjoPay is currently available in the United States. We're working on expanding to more countries soon. You can use the app anywhere, but payments and withdrawals are processed in USD through US-based payment processors."
      },
      {
        q: "Do I need to verify my identity?",
        a: "For basic usage, you only need to verify your email or phone number. For larger transactions or withdrawals, we may require additional identity verification to comply with financial regulations and ensure account security."
      }
    ]
  },
  {
    category: "Groups & Contributions",
    icon: "👥",
    questions: [
      {
        q: "How do I create a savings group?",
        a: "Go to the Groups tab, tap 'Create Group', and enter your group details including name, description, contribution amount, frequency (weekly, bi-weekly, monthly), and number of members. Once created, you'll receive an invite link to share with members."
      },
      {
        q: "How do I join a group?",
        a: "You can join a group by clicking an invite link sent by the group admin, or by entering a group code in the 'Join Group' section. Once you accept the invitation, you'll be added to the group and can start contributing."
      },
      {
        q: "Can I be in multiple groups at the same time?",
        a: "Yes! You can join and participate in as many groups as you like. Each group operates independently with its own contribution schedule and payout rotation. Manage all your groups from the Groups tab."
      },
      {
        q: "What are the different member roles?",
        a: "AjoPay has two roles: Admin and Member. Admins can create groups, invite/remove members, manage payouts, and modify group settings. Members can contribute, view group activity, and receive their scheduled payouts."
      },
      {
        q: "How do contributions work?",
        a: "Each group has a set contribution amount and frequency. When it's time to contribute, you'll receive a notification. Simply go to the group, tap 'Make Contribution', and the amount will be deducted from your wallet balance. Contributions are tracked and visible to all group members."
      },
      {
        q: "What happens if I miss a contribution deadline?",
        a: "You can still contribute after the deadline, but your contribution status will show as 'Late'. It's important to contribute on time to maintain group trust and ensure the payout schedule runs smoothly. Group admins can see all contribution statuses."
      },
      {
        q: "How does the payout rotation work?",
        a: "Groups typically operate on a rotating payout schedule. Each cycle, one member receives the pooled contributions. The admin manages the payout order, which is usually set when the group is created. You can view your position in the payout queue in the group details."
      },
      {
        q: "Can I leave a group?",
        a: "Yes, you can leave a group at any time from the group settings. However, we recommend coordinating with the admin and ensuring you've received any payouts owed to you before leaving. Once you leave, you'll lose access to group history and activities."
      }
    ]
  },
  {
    category: "Wallet & Payments",
    icon: "💳",
    questions: [
      {
        q: "How do I fund my wallet?",
        a: "Go to the Wallet tab, tap 'Add Funds', enter the amount you want to add, and complete the payment using your credit or debit card. We use Stripe for secure payment processing. The funds appear in your wallet instantly after successful payment."
      },
      {
        q: "What payment methods are supported?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through our payment partner Stripe. You can save your card details for faster future transactions."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use Stripe, a PCI-DSS compliant payment processor trusted by millions of businesses worldwide. We never store your full card details on our servers. All payment information is encrypted and tokenized."
      },
      {
        q: "What are the fees for funding my wallet?",
        a: "We charge a 3% processing fee on wallet funding to cover payment processing costs. For example, if you want $100 in your wallet, you'll pay $103 total. The fee is clearly displayed before you confirm the transaction."
      },
      {
        q: "How do I withdraw funds from my wallet?",
        a: "Go to Wallet, tap 'Withdraw', link your bank account (if not already linked), enter the withdrawal amount, and confirm. Withdrawals are processed within 3-5 business days and sent directly to your linked bank account."
      },
      {
        q: "Are there limits on wallet funding or withdrawals?",
        a: "For security purposes, new accounts may have initial limits. These limits increase as you use the app and verify your account. Typical limits are $1,000 per transaction and $5,000 per week, but can be increased upon request."
      },
      {
        q: "What happens if a payment fails?",
        a: "If a payment fails, you'll receive a notification explaining why (insufficient funds, card declined, etc.). You can retry the payment with the same or different card. No fees are charged for failed transactions."
      },
      {
        q: "Can I get a refund?",
        a: "Wallet funding transactions are generally non-refundable once completed, as they're immediately available for use. However, if there's an error or unauthorized transaction, please contact support within 48 hours and we'll investigate."
      },
      {
        q: "How do I view my transaction history?",
        a: "Go to the Wallet tab and tap 'Transaction History'. You'll see all your wallet fundings, withdrawals, contributions, and payouts with dates, amounts, and statuses. You can filter by date range and transaction type."
      }
    ]
  },
  {
    category: "Security & Privacy",
    icon: "🔒",
    questions: [
      {
        q: "How is my data protected?",
        a: "We use Supabase for secure data storage with row-level security, ensuring you only access your own data. All connections use SSL/TLS encryption. We never sell your personal information to third parties."
      },
      {
        q: "Can I use biometric login (Face ID/Touch ID)?",
        a: "Yes! After your first login, you can enable biometric authentication in Settings > Security. This allows you to log in quickly using Face ID or Touch ID instead of your password."
      },
      {
        q: "What is the security PIN for?",
        a: "Your security PIN adds an extra layer of protection for sensitive actions like making contributions or withdrawing funds. You'll set this up during your first login. You can change it anytime in Settings > Security."
      },
      {
        q: "What if I forget my password?",
        a: "On the login screen, tap 'Forgot Password'. Enter your email address, and we'll send you a password reset link. Follow the link to create a new password. If you have issues, contact support."
      },
      {
        q: "What if I forget my security PIN?",
        a: "After multiple failed PIN attempts, you'll be prompted to log in with your password instead. Once logged in, you can reset your PIN in Settings > Security > Change PIN."
      },
      {
        q: "Can I enable two-factor authentication (2FA)?",
        a: "Currently, we use email/phone verification as a form of 2FA. We're working on adding additional 2FA options like authenticator apps in future updates."
      },
      {
        q: "How do I report suspicious activity?",
        a: "If you notice any unauthorized transactions or suspicious activity, immediately contact support at support@ajopay.com or through in-app support. You can also lock your account from Settings > Security > Lock Account."
      }
    ]
  },
  {
    category: "Notifications & Alerts",
    icon: "🔔",
    questions: [
      {
        q: "What notifications will I receive?",
        a: "You'll get notifications for: group invitations, upcoming contributions, received contributions, payouts sent/received, wallet funding confirmations, withdrawal updates, and security alerts. You can customize these in Settings > Notifications."
      },
      {
        q: "How do I enable/disable notifications?",
        a: "Go to Settings > Notifications to toggle specific notification types. You can enable/disable push notifications, email notifications, and SMS notifications independently for different events."
      },
      {
        q: "Why am I not receiving notifications?",
        a: "Check your device settings to ensure AjoPay has notification permissions. Also verify your notification preferences in Settings > Notifications. If issues persist, try logging out and back in."
      },
      {
        q: "Can I schedule quiet hours for notifications?",
        a: "Yes! In Settings > Notifications, you can set quiet hours (e.g., 10 PM - 7 AM) when you won't receive non-urgent push notifications. Critical security alerts will still come through."
      }
    ]
  },
  {
    category: "Troubleshooting",
    icon: "🔧",
    questions: [
      {
        q: "The app is crashing or freezing, what should I do?",
        a: "Try these steps: 1) Force close and restart the app, 2) Check for app updates in the App Store/Play Store, 3) Restart your device, 4) Uninstall and reinstall the app. Your data is stored securely in the cloud and will sync when you log back in."
      },
      {
        q: "I can't log in, what should I do?",
        a: "Verify you're using the correct email/phone and password. Check your internet connection. If you've enabled biometrics, try using password login instead. If still stuck, use 'Forgot Password' to reset."
      },
      {
        q: "My contribution isn't showing up in the group.",
        a: "Pull down to refresh the group screen. If it still doesn't appear, check your transaction history in Wallet to confirm the payment went through. If the payment succeeded but isn't showing, contact support with your transaction ID."
      },
      {
        q: "I didn't receive a payout I was expecting.",
        a: "Check the group's payout schedule and rotation. Verify with your group admin about the payout timing. Check your wallet transaction history to see if the payout was processed. If it's missing, the admin may need to initiate it."
      },
      {
        q: "My bank account won't link for withdrawals.",
        a: "Ensure you're entering correct bank account details (routing number, account number). Some banks may require additional verification. Try linking from a desktop browser or contact your bank to ensure they support ACH transfers."
      },
      {
        q: "The app is running slowly.",
        a: "Clear the app cache in Settings > Privacy > Clear Cache. Ensure you have a stable internet connection. Check if your device has sufficient storage space. Update to the latest app version."
      }
    ]
  },
  {
    category: "Account Management",
    icon: "⚙️",
    questions: [
      {
        q: "How do I update my profile information?",
        a: "Go to Profile > Edit Profile. You can update your name, profile picture, phone number, and other details. Some changes (like email) may require verification."
      },
      {
        q: "How do I change my email address?",
        a: "Go to Settings > Account > Email Address, enter your new email, and verify it by clicking the link sent to your new email. Your login credentials will update automatically."
      },
      {
        q: "Can I change my username?",
        a: "Yes, go to Profile > Edit Profile and update your display name. Note that your email/phone login credentials remain the same; only your display name changes."
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings > Account > Delete Account. You'll need to withdraw any remaining wallet balance and settle all group obligations before deletion. This action is permanent and cannot be undone."
      },
      {
        q: "What happens to my data if I delete my account?",
        a: "Your personal data will be permanently deleted within 30 days. Group transaction history may be retained (anonymized) for record-keeping and legal compliance, but your personal information will be removed."
      }
    ]
  },
  {
    category: "Contact & Support",
    icon: "💬",
    questions: [
      {
        q: "How do I contact customer support?",
        a: "You can reach us via: Email at support@ajopay.com, In-app support (Profile > Help & Support), or through our website contact form. We typically respond within 24 hours during business days."
      },
      {
        q: "What are your support hours?",
        a: "Our support team is available Monday-Friday, 9 AM - 6 PM EST. Emergency security issues are monitored 24/7. We aim to respond to all inquiries within 24 hours."
      },
      {
        q: "Do you have a community forum or social media?",
        a: "Yes! Follow us on Twitter @ajopay and Instagram @ajopay for updates, tips, and community stories. We also have a community Discord server linked in the app."
      },
      {
        q: "How do I report a bug or request a feature?",
        a: "We'd love to hear from you! Send bug reports or feature requests to feedback@ajopay.com or use the 'Send Feedback' option in Settings. Include screenshots and device info for faster resolution."
      },
      {
        q: "Is there a way to talk to a real person?",
        a: "Absolutely. While our AI assistant handles common questions, you can request to speak with a support agent by replying to any automated message or emailing support@ajopay.com with 'Urgent' in the subject line."
      }
    ]
  }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-4 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        (activeCategory === 'all' || category.category === activeCategory) &&
        (searchQuery === '' ||
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/appicon.png" alt="AjoPay" width={28} height={28} className="rounded" />
            <span className="text-lg font-semibold text-gray-900">AjoPay</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/support" className="text-gray-900 font-medium">
              Support
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find answers to common questions, learn how to use AjoPay, and get the support you need.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="mailto:support@ajopay.com"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Mail className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-500">support@ajopay.com</p>
              </div>
            </a>

            <a
              href="mailto:feedback@ajopay.com"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Send Feedback</h3>
                <p className="text-sm text-gray-500">feedback@ajopay.com</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Response Time</h3>
                <p className="text-sm text-gray-500">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {faqs.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === category.category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {searchQuery && (
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0)} results found for "{searchQuery}"
              </p>
            </div>
          )}

          <div className="space-y-8">
            {filteredFAQs.map((category) => (
              <div key={category.category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span>{category.category}</span>
                    <span className="ml-auto text-sm font-normal text-gray-500">
                      {category.questions.length} {category.questions.length === 1 ? 'question' : 'questions'}
                    </span>
                  </h2>
                </div>
                <div>
                  {category.questions.map((item, idx) => (
                    <FAQItem key={idx} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any answers matching your search. Try different keywords or contact support.
              </p>
              <a
                href="mailto:support@ajopay.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          )}

          {/* Still Need Help Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-center text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-3">Still need help?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or issues.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="mailto:support@ajopay.com"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
              <a
                href="mailto:feedback@ajopay.com"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors border border-blue-400 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send Feedback
              </a>
            </div>
            <p className="mt-6 text-sm text-blue-100">
              Response time: Within 24 hours • Monday-Friday, 9 AM - 6 PM EST
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/appicon.png" alt="AjoPay" width={24} height={24} className="rounded" />
              <span className="text-sm text-gray-600">© {new Date().getFullYear()} AjoPay. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900">
                Support
              </Link>
              <a href="mailto:support@ajopay.com" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
