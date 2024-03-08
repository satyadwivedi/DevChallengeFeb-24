using { sap.capire.bookshop as my } from './admin-service';

annotate my.Books with @PersonalData : {
   EntitySemantics: 'DataSubject',
   DataSubjectRole: 'Books'
} {
     ID    @PersonalData.FieldSemantics: 'DataSubjectID';
  descr    @PersonalData.IsPotentiallyPersonal;
  genre    @PersonalData.IsPotentiallyPersonal;
  stock    @PersonalData.IsPotentiallyPersonal;
  price    @PersonalData.IsPotentiallyPersonal;
  currency @PersonalData.IsPotentiallySensitive;
}
annotate my.Authors with @PersonalData : { EntitySemantics: 'DataSubjectDetails' } {
  ID      @PersonalData.FieldSemantics: 'DataSubjectID';
  dateOfBirth          @PersonalData.IsPotentiallyPersonal;
  placeOfBirth      @PersonalData.IsPotentiallyPersonal;
  placeOfDeath @PersonalData.IsPotentiallyPersonal;
}