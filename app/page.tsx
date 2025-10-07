"use client"

import { ArrowRight, Shield, Zap, Star, Server, Gamepad2, Headphones, HardDrive, Bot, LayoutTemplate, CheckCircle, Users, Trophy, Sparkles, Mail, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  const services = [
    {
      title: "Growtopia Hosting",
      slug: "growtopia",
      description: "Premium Growtopia server hosting with custom features and 24/7 support",
      icon: Server,
      features: ["Custom Items", "Server Console", "Discord Community"],
      price: "Rp. 120,000/month",
      note: "(also accept Real Growtopia DL payment)",
      popular: true,
      theme: {
        primary: "from-green-500/20 to-emerald-600/20",
        secondary: "from-green-400/10 to-emerald-500/10",
        accent: "text-green-400",
        border: "border-green-500/30",
        badge: "bg-green-500/20 text-green-300 border-green-500/30",
        icon: "text-green-400"
      }
    },
    {
      title: "Website Builder",
      slug: "website",
      description: "Get a professional website for your gaming community or business",
      icon: LayoutTemplate,
      features: ["High Quality", "SEO Optimized", "Custom Domain"],
      price: "Rp. 30.000 - ??.???",
      note: "Depends on features",
      popular: false,
      theme: {
        primary: "from-blue-500/20 to-cyan-600/20",
        secondary: "from-blue-400/10 to-cyan-500/10",
        accent: "text-blue-400",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        icon: "text-blue-400"
      }
    },
    {
      title: "Roblox Game",
      slug: "roblox",
      description: "Custom Roblox game development and scripting services",
      icon: LayoutTemplate,
      features: ["Custom Game Design", "Scripting & Development", "Monetization Options"],
      price: "Rp. 100.000 - ??.???",
      note: "Depends on features",
      popular: false,
      theme: {
        primary: "from-red-500/20 to-pink-600/20",
        secondary: "from-red-400/10 to-pink-500/10",
        accent: "text-red-400",
        border: "border-red-500/30",
        badge: "bg-red-500/20 text-red-300 border-red-500/30",
        icon: "text-red-400"
      }
    },
    {
      title: "Discord & Telegram Bot",
      slug: "bot",
      description: "Setup your own bot with custom commands and features",
      icon: Bot,
      features: ["Customizable Feature", "Easy Setup", "Reliable Performance"],
      price: "Rp. 30.000 - ??.???",
      note: "Depends on features",
      popular: false,
      theme: {
        primary: "from-purple-500/20 to-violet-600/20",
        secondary: "from-purple-400/10 to-violet-500/10",
        accent: "text-purple-400",
        border: "border-purple-500/30",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        icon: "text-purple-400"
      }
    },
  ]

  const stats = [
    { label: "Customizable Services", value: "100%", icon: Server },
    { label: "24/7 Support", value: "Always", icon: Headphones },
    { label: "Anti DDoS Protection", value: "Premium", icon: Shield },
    { label: "High End Infrastructure", value: "Enterprise", icon: HardDrive },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 min-h-screen flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 text-primary/30 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
          <Server className="w-8 h-8" />
        </div>
        <div className="absolute top-40 right-32 text-secondary/30 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}>
          <Gamepad2 className="w-10 h-10" />
        </div>
        <div className="absolute bottom-32 left-32 text-primary/20 animate-bounce" style={{ animationDelay: "2s", animationDuration: "3s" }}>
          <Sparkles className="w-12 h-12" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Gaming Services
              </Badge>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x leading-tight">
                Welcome to<br />
                <span className="text-foreground">Xovan Store</span>
              </h1>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Your ultimate destination for premium gaming services, high-performance servers, and professional gaming support that never sleeps.
              </p>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="flex items-center gap-3 cursor-pointer px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Server className="w-5 h-5" />
                  Browse Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50"
                  onClick={() => document.getElementById("servers")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  View All Servers
                </Button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp}>
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>99.9% Uptime Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>10,000+ Happy Gamers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-secondary" />
                  <span>Award-Winning Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
                    <div className="text-lg md:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground leading-tight">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className: "text-3xl font-bold mb-4" } as any)}>
              Our Services
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className: "text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"} as any)}>
              Comprehensive gaming solutions designed to enhance your gaming experience with professional quality and reliability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card className={`relative hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${service.theme.primary} ${service.theme.border} backdrop-blur-sm`}>
                  {service.popular && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground animate-pulse">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <service.icon className={`w-8 h-8 ${service.theme.icon}`} />
                      <CardTitle className={`text-xl ${service.theme.accent}`}>{service.title}</CardTitle>
                    </div>
                    <p className="text-foreground/90 font-medium">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} className={`text-xs hover:scale-110 transition-transform ${service.theme.badge}`}>{feature}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className={`text-lg font-semibold ${service.theme.accent}`}>{service.price}</span>
                        <span className="text-xs text-muted-foreground">{service.note}</span>
                        <Link href={`/services/${service.slug}`}>
                          <Button variant="outline" size="sm" className={`w-full mt-2 bg-transparent cursor-pointer hover:scale-105 transition-transform ${service.theme.border} hover:bg-gradient-to-r ${service.theme.secondary}`}>
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servers Section */}
      <section id="servers" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className: "text-3xl font-bold mb-4"} as any )}>
              Browse Servers
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className:"text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"} as any )}>
              Explore our active game servers with real-time player counts and server information.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link href="/servers?game=growtopia">
              <Card className="hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/30 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <Server className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Growtopia Servers</h3>
                  <p className="text-muted-foreground mb-4">Browse active Growtopia servers with custom features</p>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer hover:scale-105 transition-transform">
                    View Servers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/servers?game=minecraft">
              <Card className="hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer border-secondary/30 hover:border-secondary/50">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Coming soon...</h3>
                  <p className="text-muted-foreground mb-4"></p>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer hover:scale-105 transition-transform">
                    View Servers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className:"text-3xl font-bold mb-4" } as any )}>
              Why Choose Xovan Store?
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className:"text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"} as any )}>
              We provide industry-leading gaming services with unmatched reliability and professional support.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Secure & Protected", desc: "Advanced DDoS protection and security measures to keep your gaming experience safe and uninterrupted." },
              { icon: Zap, title: "Lightning Fast", desc: "High-performance infrastructure with low latency connections for the best gaming experience possible." },
              { icon: Star, title: "Premium Quality", desc: "Professional-grade services with 24/7 support and guaranteed uptime for your peace of mind." },
            ].map((feature, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <Card className="text-center border-border/50 hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className:"text-3xl font-bold mb-4" } as any )}>
            Ready to Get Started?
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} {...({ className:"text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" } as any )}>
            Join thousands of satisfied customers and experience the difference with Xovan Store's premium gaming services.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/growtopia">
              <Button size="lg" className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                View Growtopia Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="cursor-pointer hover:scale-105 transition-transform">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

    </div>
  )
}
