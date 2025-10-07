"use client"

import { useState } from "react"
import { ArrowRight, Shield, Users, MessageCircle, Palette, Terminal, CheckCircle, Star, Clock, Zap, Globe, CreditCard, Phone, Mail, HelpCircle, ChevronDown, X, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

export default function GrowtopiaServices() {
   const [selectedPlan, setSelectedPlan] = useState("basic")
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     whatsapp: "",
     serverName: "",
     paymentMethod: "",
     additionalNotes: ""
   })

   const handlePlanSelect = (planId: string) => {
     setSelectedPlan(planId)
     setIsModalOpen(true)
   }

   const handleFormSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setIsSubmitting(true)

     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 2000))

     // Here you would typically send the data to your backend
     console.log("Form submitted:", { ...formData, selectedPlan })

     setIsSubmitting(false)
     setIsModalOpen(false)
     // Reset form
     setFormData({
       name: "",
       email: "",
       whatsapp: "",
       serverName: "",
       paymentMethod: "",
       additionalNotes: ""
     })
   }

  const plans = [
    {
      id: "basic",
      name: "Basic Server",
      price: "Rp. 120,000",
      period: "/month",
      description: "Perfect for small communities",
      features: [
        "Up to 300 players",
        "Advanced custom items",
        "Full server console",
        "Discord support",
        "Daily backups",
        "Include ready world design",
        "99.5% uptime guarantee",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium Server",
      price: "Rp. 160,000",
      period: "/month",
      description: "Best for growing communities",
      features: [
        "Up to 600 players",
        "Advanced custom items",
        "Full server console",
        "Priority Discord support",
        "2Hour backups",
        "Include ready world design",
        "99.9% uptime guarantee",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Server",
      price: "Rp. 200,000",
      period: "/month",
      description: "For large communities",
      features: [
        "Unlimited players",
        "Premium custom items",
        "Advanced server console",
        "24/7 dedicated support",
        "30Min backups",
        "Include ready world design",
        "99.99% uptime guarantee",
        "Custom features development",
      ],
      popular: false,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Anti-DDoS Protection",
      description: "Advanced protection against DDoS attacks to keep your server online 24/7",
    },
    {
      icon: Users,
      title: "Discord Community",
      description: "Join our active Discord community for support, feature requests, and updates",
    },
    {
      icon: Palette,
      title: "Custom Items & Design",
      description: "Get custom items and world designs tailored to your server's theme",
    },
    {
      icon: Terminal,
      title: "Server Console",
      description: "Full access to server console for complete control over your Growtopia server",
    },
  ]

  const testimonials = [
    {
      name: "Ahmad Rahman",
      role: "Server Owner",
      avatar: "AR",
      rating: 5,
      content: "Excellent hosting service! My server has been running smoothly for 6 months with 99.9% uptime. The support team is very responsive.",
      serverName: "IndoCraft GT"
    },
    {
      name: "Siti Nurhaliza",
      role: "Community Manager",
      avatar: "SN",
      rating: 5,
      content: "The custom items and world designs exceeded our expectations. Our community grew from 200 to 800 players in just 2 months!",
      serverName: "GrowAsia Network"
    },
    {
      name: "Budi Santoso",
      role: "Server Admin",
      avatar: "BS",
      rating: 5,
      content: "Professional service with great anti-DDoS protection. Never had any downtime issues. Highly recommended for serious server owners.",
      serverName: "GT Pro League"
    }
  ]

  const stats = [
    { label: "Active Servers", value: "50+", icon: Server },
    { label: "Happy Customers", value: "100+", icon: Users },
    { label: "Uptime Guarantee", value: "99.9%", icon: Zap },
    { label: "Years Experience", value: "2+", icon: Clock }
  ]
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-in fade-in duration-1000">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Most Popular Service</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent
               bg-gradient-to-r from-[var(--gt-primary)] to-[var(--gt-secondary)]">
              Growtopia Server Hosting
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium Growtopia server hosting on powerful VPS infrastructure with custom features, 24/7 support, and
              Discord community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="cursor-pointer" size="lg" asChild>
                <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Growtopia Hosting?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All Growtopia servers are hosted on one powerful VPS with premium features and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to suit communities of all sizes. (Also accept Real Growtopia DL payment - price
              depends on RGT Economy).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-xl hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
                  plan.popular ? "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 scale-105 shadow-lg" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full cursor-pointer"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your server with our premium add-on services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-8 h-8 text-primary" />
                  <CardTitle>Custom Items & Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get custom items and world designs created specifically for your server's theme and community.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">Starting at Rp. 20,000</span>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-secondary" />
                  <CardTitle>Discord Community Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our exclusive Discord community where you can request features, report bugs, and get priority
                  support.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-secondary">Free with hosting</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                      Join Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. Here are some of the most common questions about our Growtopia hosting service.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How quickly can I get my server up and running?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most servers are set up within 5-10 minutes after payment confirmation. You'll receive server access from dashboard once created.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept Bank Transfer, OVO, DANA, GoPay, QRIS, and Real Growtopia DL (World Lock/DoorID). Payment in Real Growtopia DL is calculated based on current RGT economy rates.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I upgrade or downgrade my plan later?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can upgrade your plan at any time. Contact our support team for assistance with plan changes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What kind of support do you provide?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We provide 24/7 Discord support for all plans. Our average response time is under 2 hours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Do you provide backups of my server?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! All plans include automatic daily backups. Premium plans get 2-hour backups, and Enterprise plans get 30-minute backups. You can also request manual backups anytime through the control panel.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What if my server goes down?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We guarantee 99.5% uptime for Basic, 99.9% for Premium, and 99.99% for Enterprise plans. If we fail to meet these guarantees, you'll receive service credits. Our monitoring systems automatically restart crashed servers within minutes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or need help? Our support team is here to assist you 24/7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0ms' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Discord Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our Discord server for instant support and community help
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '150ms' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Direct WhatsApp support for urgent inquiries and orders
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Send Message
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl hover:scale-105 transition-all duration-300 text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us an email for detailed inquiries and business proposals
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:support@xovanhosting.com">
                    Send Email
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <div className="bg-card/50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">Response Times</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-green-600">Discord</div>
                  <div className="text-muted-foreground">Under 30 minutes</div>
                </div>
                <div>
                  <div className="font-medium text-green-600">WhatsApp</div>
                  <div className="text-muted-foreground">Under 2 hours</div>
                </div>
                <div>
                  <div className="font-medium text-blue-600">Email</div>
                  <div className="text-muted-foreground">Within 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Growtopia Server?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied server owners and create the ultimate Growtopia experience for your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2 cursor-pointer">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Order Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Order {plans.find(p => p.id === selectedPlan)?.name}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to start your Growtopia server hosting setup.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  required
                  placeholder="+62xxxxxxxxxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serverName">Server Name *</Label>
                <Input
                  id="serverName"
                  value={formData.serverName}
                  onChange={(e) => setFormData({...formData, serverName: e.target.value})}
                  required
                  placeholder="My Awesome Server"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="ovo">OVO</SelectItem>
                  <SelectItem value="dana">DANA</SelectItem>
                  <SelectItem value="gopay">GoPay</SelectItem>
                  <SelectItem value="real_growtopia">Real Growtopia DL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                placeholder="Any special requirements or custom features you'd like..."
                rows={3}
              />
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{plans.find(p => p.id === selectedPlan)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-medium">{plans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className="font-medium">{formData.paymentMethod || 'Not selected'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
