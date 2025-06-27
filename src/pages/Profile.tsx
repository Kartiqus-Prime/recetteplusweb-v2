import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseProfile, useUpdateSupabaseProfile } from '@/hooks/useSupabaseProfiles';
import { User, Mail, Calendar, LogOut, Shield, AlertTriangle, CheckCircle, Eye, EyeOff, Settings, Phone, Smartphone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout, sendVerificationEmail, updateUserProfile, updateUserPassword } = useAuth();
  const { data: userProfile } = useSupabaseProfile(currentUser?.id);
  const updateProfile = useUpdateSupabaseProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [displayName, setDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Préférences
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);

  const availableDietaryRestrictions = [
    'Végétarien', 'Végétalien', 'Sans gluten', 'Sans lactose', 'Halal', 'Casher', 'Sans noix'
  ];

  const availableCategories = [
    'Cuisine française', 'Cuisine italienne', 'Cuisine asiatique', 'Cuisine africaine',
    'Pâtisserie', 'Plats rapides', 'Cuisine healthy', 'Barbecue'
  ];

  useEffect(() => {
    if (currentUser?.user_metadata?.display_name || currentUser?.user_metadata?.full_name) {
      setDisplayName(currentUser.user_metadata.display_name || currentUser.user_metadata.full_name);
    }
  }, [currentUser]);

  useEffect(() => {
    if (userProfile?.preferences) {
      setDietaryRestrictions(userProfile.preferences.dietaryRestrictions || []);
      setFavoriteCategories(userProfile.preferences.favoriteCategories || []);
    }
  }, [userProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt sur Recette+ !"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter",
        variant: "destructive"
      });
    }
  };

  const handleSendVerification = async () => {
    try {
      setLoading(true);
      await sendVerificationEmail();
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour confirmer votre adresse email"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de vérification",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      await updateUserProfile(displayName);
      setIsEditing(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      await updateProfile.mutateAsync({
        userId: currentUser.id,
        data: {
          preferences: {
            dietaryRestrictions,
            favoriteCategories
          }
        }
      });
      setIsEditingPreferences(false);
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await updateUserPassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été mis à jour avec succès"
      });
    } catch (error: any) {
      let errorMessage = "Impossible de modifier le mot de passe";
      if (error.code === 'auth/requires-recent-login') {
        errorMessage = "Veuillez vous reconnecter pour modifier votre mot de passe";
      }
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const toggleFavoriteCategory = (category: string) => {
    setFavoriteCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
            <Button 
              onClick={() => navigate('/login')} 
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasPhoneNumber = currentUser.identities?.some((identity: any) => identity.provider === 'phone');
  const isEmailConfirmed = currentUser.email_confirmed_at !== null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Se déconnecter
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Informations principales */}
          <div className="md:col-span-2 space-y-6">
            {!isEmailConfirmed && currentUser.email && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  Votre adresse email n'est pas vérifiée.{' '}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-orange-600 underline"
                    onClick={handleSendVerification}
                    disabled={loading}
                  >
                    Cliquez ici pour renvoyer l'email de vérification
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    {currentUser.user_metadata?.avatar_url ? (
                      <img 
                        src={currentUser.user_metadata.avatar_url} 
                        alt="Avatar" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-8 w-8 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Votre nom"
                        className="mb-2"
                      />
                    ) : (
                      <h3 className="text-lg font-semibold">
                        {currentUser.user_metadata?.display_name || currentUser.user_metadata?.full_name || 'Utilisateur'}
                      </h3>
                    )}
                    {currentUser.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">{currentUser.email}</span>
                        {isEmailConfirmed && (
                          <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                        )}
                      </div>
                    )}
                    {hasPhoneNumber && (
                      <div className="flex items-center text-gray-600 mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        <span className="text-sm">Numéro vérifié</span>
                        <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    Membre depuis {new Date(currentUser.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="flex items-center space-x-2 flex-wrap">
                  {isEmailConfirmed && (
                    <Badge variant="default">Email vérifié</Badge>
                  )}
                  {hasPhoneNumber && (
                    <Badge variant="default">Téléphone vérifié</Badge>
                  )}
                  {currentUser.identities?.some((identity: any) => identity.provider === 'google') && (
                    <Badge variant="outline">Compte Google</Badge>
                  )}
                  {userProfile?.role === 'admin' && (
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      <Shield className="h-3 w-3 mr-1" />
                      Administrateur
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2 pt-4">
                  {isEditing ? (
                    <>
                      <Button 
                        onClick={handleSaveProfile} 
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={loading}
                      >
                        Sauvegarder
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Modifier
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Password change section - Only for email/password users */}
            {!currentUser.identities?.some((identity: any) => identity.provider === 'google') && currentUser.email && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isChangingPassword ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsChangingPassword(true)}
                    >
                      Changer le mot de passe
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nouveau mot de passe"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirmer le nouveau mot de passe"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleChangePassword}
                          className="bg-orange-500 hover:bg-orange-600"
                          disabled={loading}
                        >
                          Modifier
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsChangingPassword(false);
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Preferences section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Préférences culinaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEditingPreferences ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Restrictions alimentaires</h4>
                      <div className="flex flex-wrap gap-2">
                        {dietaryRestrictions.length > 0 ? (
                          dietaryRestrictions.map(restriction => (
                            <Badge key={restriction} variant="outline">{restriction}</Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">Aucune restriction</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Catégories favorites</h4>
                      <div className="flex flex-wrap gap-2">
                        {favoriteCategories.length > 0 ? (
                          favoriteCategories.map(category => (
                            <Badge key={category} variant="outline">{category}</Badge>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">Aucune catégorie favorite</span>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditingPreferences(true)}>
                      Modifier les préférences
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Restrictions alimentaires</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {availableDietaryRestrictions.map(restriction => (
                          <div key={restriction} className="flex items-center space-x-2">
                            <Checkbox
                              id={`restriction-${restriction}`}
                              checked={dietaryRestrictions.includes(restriction)}
                              onCheckedChange={() => toggleDietaryRestriction(restriction)}
                            />
                            <label htmlFor={`restriction-${restriction}`} className="text-sm">
                              {restriction}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Catégories favorites</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {availableCategories.map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={favoriteCategories.includes(category)}
                              onCheckedChange={() => toggleFavoriteCategory(category)}
                            />
                            <label htmlFor={`category-${category}`} className="text-sm">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleSavePreferences}
                        className="bg-orange-500 hover:bg-orange-600"
                        disabled={loading}
                      >
                        Sauvegarder
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditingPreferences(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mes statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">0</div>
                  <div className="text-sm text-gray-600">Recettes favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">0</div>
                  <div className="text-sm text-gray-600">Commandes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">0</div>
                  <div className="text-sm text-gray-600">Vidéos vues</div>
                </div>
              </CardContent>
            </Card>

            {userProfile?.role === 'admin' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-purple-600" />
                    Administration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Vous avez accès aux fonctions d'administration.
                  </p>
                  <Link to="/admin">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Panneau d'administration
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
