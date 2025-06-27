
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Users, 
  Target, 
  Eye, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Lightbulb,
  Heart,
  Smartphone,
  ShoppingCart,
  Play,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/fd4068e4-5395-416a-a0d9-2f2084813da4.png" 
              alt="Recette+" 
              className="h-24 w-auto"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            À propos de <span className="text-orange-500">Recette+</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Une startup innovante malienne qui révolutionne l'expérience culinaire 
            en combinant apprentissage et e-commerce dans une seule application.
          </p>
          <Badge className="bg-orange-100 text-orange-700 px-4 py-2 text-lg">
            RECETTE+ SARL - Mali
          </Badge>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  Offrir une expérience culinaire fluide et accessible à tous en combinant 
                  apprentissage et e-commerce. Nous aidons les utilisateurs à préparer des 
                  plats variés sans stress, en leur fournissant des recettes claires et tous 
                  les ingrédients nécessaires, livrés directement chez eux.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-center">
                  Devenir une référence nationale en matière d'apprentissage culinaire 
                  interactif et de commerce alimentaire en ligne. Révolutionner la manière 
                  de cuisiner avec une plateforme intuitive et connectée à un écosystème 
                  d'achat intelligent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* L'idée du projet */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">L'Idée Innovante</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Recette+ est une application mobile innovante qui facilite le quotidien culinaire 
              des utilisateurs en leur proposant des recettes variées, accessibles en vidéo. 
              Son originalité réside dans la possibilité de commander directement les ingrédients 
              nécessaires, livrés à domicile, ce qui fait gagner du temps et évite les déplacements.
            </p>
          </div>
        </div>
      </section>

      {/* Fonctionnalités clés */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Nos Fonctionnalités Clés
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Vidéos Tutoriels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Des tutoriels clairs et détaillés pour apprendre à cuisiner 
                  une grande variété de plats, adaptés à tous les niveaux.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Commande Intégrée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Commandez directement les ingrédients nécessaires depuis 
                  l'application, avec livraison à domicile.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Partenariats Locaux</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Soutien aux vendeurs locaux grâce à un système de 
                  partenariat intégré, garantissant qualité et fraîcheur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Défis du e-commerce au Mali */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Notre Réponse aux Défis du E-commerce au Mali
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">
            Le secteur du e-commerce au Mali fait face à de nombreux défis que Recette+ adresse directement :
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Les Défis Identifiés</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Logistique et approvisionnement compliqués par des circuits fragmentés</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Produits dispersés sur différentes plateformes</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Manque de transparence sur l'origine des produits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700">Solutions de paiement peu adaptées aux réalités locales</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Nos Solutions</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-gray-700">Plateforme centralisée tout-en-un</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-gray-700">Partenariats étroits avec fournisseurs locaux</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-gray-700">Traçabilité complète des produits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <p className="text-gray-700">Solutions de paiement mobile adaptées localement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implantation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Implantation</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Recette+ est implanté à Bamako, plus précisément au quartier ACI 2000. 
              Ce choix stratégique nous permet d'être au cœur de l'activité économique 
              malienne tout en restant proche de nos partenaires et clients.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Informations de Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">ACI 2000, Bamako - Mali</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-orange-500" />
                      <div className="text-gray-700">
                        <div>+223 78 21 63 98</div>
                        <div>+223 90 74 10 90</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">contact@recette-plus.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-700">www.recette-plus.com</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Statut Juridique</h3>
                  <p className="text-gray-700 mb-4">
                    Recette+ est une startup malienne créée sous forme d'une SARL 
                    par cinq associés passionnés de cuisine et de technologie.
                  </p>
                  <Badge className="bg-orange-100 text-orange-700 px-3 py-1">
                    RECETTE+ SARL
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez l'Aventure Recette+
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez une nouvelle façon de cuisiner avec notre application 
            qui combine passion culinaire et innovation technologique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recettes">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 font-bold">
                <ChefHat className="h-5 w-5 mr-2" />
                Découvrir nos recettes
              </Button>
            </Link>
            <Link to="/download-app">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-bold">
                <Smartphone className="h-5 w-5 mr-2" />
                Télécharger l'application
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
