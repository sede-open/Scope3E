import { ApolloError, NetworkStatus } from 'apollo-boost';
import { GraphQLError } from 'graphql';
import {
  CompanyRelationshipsQuery_companyRelationships_customer,
  CompanyRelationshipsQuery_companyRelationships_supplier,
} from 'types/CompanyRelationshipsQuery';

export enum ModalContentType {
  NEW_BASELINE = 'NEW_BASELINE',
  NEW_BASELINE_SUCCESS = 'NEW_BASELINE_SUCCESS',
  NEW_ACTUAL = 'NEW_ACTUAL',
  EDIT_ACTUAL = 'EDIT_ACTUAL',
  EDIT_BASELINE = 'EDIT_BASELINE',
  DELETE_EMISSIONS = 'DELETE_EMISSIONS',
  NEW_TARGET = 'NEW_TARGET',
  EDIT_TARGET = 'EDIT_TARGET',
  INEXPERIENCED_USER_FLOW_ADD_BASELINE = 'INEXPERIENCED_USER_FLOW_ADD_BASELINE',
  INEXPERIENCED_USER_FLOW_ADD_EMISSION = 'INEXPERIENCED_USER_FLOW_ADD_EMISSION',
  ADD_EMISSION = 'ADD_EMISSION',
}

export type Company =
  | CompanyRelationshipsQuery_companyRelationships_customer
  | CompanyRelationshipsQuery_companyRelationships_supplier;

export enum TaskListModalContentType {
  UNLOCKED_DASHBOARD,
  WELCOME_BACK,
}

export enum AdminDashboardModalType {
  EXTERNAL_USER_FORM,
  INTERNAL_USER_FORM,
}

export interface QueryContainer<T> {
  data: T;
  errors?: readonly GraphQLError[] | undefined;
  error?: ApolloError | undefined;
  loading: boolean;
  networkStatus?: NetworkStatus;
  partial?: boolean | undefined;
}
